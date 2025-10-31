import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { GetTaskByIdUseCase } from 'src/task/application/usecases/get-task-by-id.usecase';
import { ITaskRepository } from 'src/task/domain/repositories/task.repository.interface';
import { CurrentUserService } from 'src/shared/services/current-user.service';
import { UserEntityBuilder } from 'test/support/builders/entities/user.entity.builder';
import { TaskEntityBuilder } from 'test/support/builders/entities/task.entity.builder';
import { TaskRepositoryMock } from 'test/support/mocks/repositories/task-repository.mock';

describe('GetTaskByIdUseCase', () => {
  let sut: GetTaskByIdUseCase;
  let taskRepositoryMock: TaskRepositoryMock;
  let currentUserService: CurrentUserService;

  beforeEach(async () => {
    taskRepositoryMock = new TaskRepositoryMock();
    currentUserService = new CurrentUserService();

    const moduleRef = await Test.createTestingModule({
      providers: [
        GetTaskByIdUseCase,
        { provide: ITaskRepository, useValue: taskRepositoryMock },
        { provide: CurrentUserService, useValue: currentUserService }
      ],
    }).compile();

    sut = moduleRef.get<GetTaskByIdUseCase>(GetTaskByIdUseCase);
  });

  describe('Success cases', () => {
    it('should get task successfully by id', async () => {
      const taskId = 'task-123';
      const { user } = UserEntityBuilder.build();
      const expectedTask = TaskEntityBuilder.build(user, { id: taskId });

      currentUserService.setUser({
        userId: user.id,
        email: user.email
      });

      taskRepositoryMock.findById.mockResolvedValue(expectedTask);

      const result = await sut.execute(taskId);

      expect(result).toEqual(expectedTask);
      expect(taskRepositoryMock.findById).toHaveBeenCalledWith(taskId, user.id);
    });
  });

  describe('Error cases', () => {
    it('should throw error when user not found', async () => {
      const taskId = 'task-123';

      const act = () => sut.execute(taskId);

      await expect(act()).rejects.toThrow('User not set in CurrentUserService');
    });

    it('should throw NotFoundException when task does not exist', async () => {
      const taskId = 'non-existent-task';
      const { user } = UserEntityBuilder.build();

      currentUserService.setUser({
        userId: user.id,
        email: user.email
      });

      taskRepositoryMock.findById.mockResolvedValue(null);

      const act = () => sut.execute(taskId);

      await expect(act()).rejects.toThrow(NotFoundException);
      await expect(act()).rejects.toThrow(`Task with id ${taskId} not found`);
    });

    it('should throw error when repository fails', async () => {
      const taskId = 'task-123';
      const { user } = UserEntityBuilder.build();
      const repositoryError = new Error('Database connection failed');

      currentUserService.setUser({
        userId: user.id,
        email: user.email
      });

      taskRepositoryMock.findById.mockRejectedValue(repositoryError);

      const act = () => sut.execute(taskId);

      await expect(act()).rejects.toThrow('Database connection failed');
    });
  });
});
