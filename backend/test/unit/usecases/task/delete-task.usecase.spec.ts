import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { DeleteTaskUseCase } from 'src/task/application/usecases/delete-task.usecase';
import { ITaskRepository } from 'src/task/domain/repositories/task.repository.interface';
import { CurrentUserService } from 'src/shared/services/current-user.service';
import { UserEntityBuilder } from 'test/support/builders/entities/user.entity.builder';
import { TaskRepositoryMock } from 'test/support/mocks/repositories/task-repository.mock';

describe('DeleteTaskUseCase', () => {
  let sut: DeleteTaskUseCase;
  let taskRepositoryMock: TaskRepositoryMock;
  let currentUserService: CurrentUserService;

  beforeEach(async () => {
    taskRepositoryMock = new TaskRepositoryMock();
    currentUserService = new CurrentUserService();

    const moduleRef = await Test.createTestingModule({
      providers: [
        DeleteTaskUseCase,
        { provide: ITaskRepository, useValue: taskRepositoryMock },
        { provide: CurrentUserService, useValue: currentUserService }
      ],
    }).compile();

    sut = moduleRef.get<DeleteTaskUseCase>(DeleteTaskUseCase);
  });

  describe('Success cases', () => {
    it('should delete task successfully', async () => {
      const taskId = 'task-123';
      const { user } = UserEntityBuilder.build();

      currentUserService.setUser({
        userId: user.id,
        email: user.email
      });

      taskRepositoryMock.delete.mockResolvedValue(true);

      await sut.execute(taskId);

      expect(taskRepositoryMock.delete).toHaveBeenCalledWith(taskId, user.id);
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

      taskRepositoryMock.delete.mockResolvedValue(false);

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

      taskRepositoryMock.delete.mockRejectedValue(repositoryError);

      const act = () => sut.execute(taskId);

      await expect(act()).rejects.toThrow('Database connection failed');
    });
  });
});
