import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UpdateTaskUseCase } from 'src/modules/task/application/usecases/update-task.usecase';
import { ITaskRepository } from 'src/modules/task/domain/repositories/task.repository.interface';
import { CurrentUserService } from 'src/shared/services/current-user.service';
import { UserEntityBuilder } from 'test/support/builders/entities/user.entity.builder';
import { TaskEntityBuilder } from 'test/support/builders/entities/task.entity.builder';
import { UpdateTaskDtoBuilder } from 'test/support/builders/dto/update-task.dto.builder';
import { TaskRepositoryMock } from 'test/support/mocks/repositories/task-repository.mock';

describe.only('UpdateTaskUseCase', () => {
  let sut: UpdateTaskUseCase;
  let taskRepositoryMock: TaskRepositoryMock;
  let currentUserService: CurrentUserService;

  beforeEach(async () => {
    taskRepositoryMock = new TaskRepositoryMock();
    currentUserService = new CurrentUserService();

    const moduleRef = await Test.createTestingModule({
      providers: [
        UpdateTaskUseCase,
        { provide: ITaskRepository, useValue: taskRepositoryMock },
        { provide: CurrentUserService, useValue: currentUserService }
      ],
    }).compile();

    sut = moduleRef.get<UpdateTaskUseCase>(UpdateTaskUseCase);
  });

  describe('Success cases', () => {
    it('should update task successfully with all data', async () => {
      const taskId = 'task-123';
      const request = UpdateTaskDtoBuilder.build();
      const { user } = UserEntityBuilder.build();
      const updatedTask = TaskEntityBuilder.build(user, {
        id: taskId,
        title: request.title,
        description: request.description,
        status: request.status
      });

      currentUserService.setUser({
        userId: user.id,
        email: user.email
      });

      taskRepositoryMock.update.mockResolvedValue(updatedTask);

      const result = await sut.execute(taskId, request);

      expect(result).toEqual(updatedTask);
      expect(taskRepositoryMock.update).toHaveBeenCalledWith(
        taskId,
        expect.objectContaining({
          title: request.title,
          description: request.description ?? '',
          status: request.status ?? 'pending',
          userId: user.id,
          updatedAt: expect.any(Date)
        }),
        user.id
      );
    });

    it('should update task with partial data', async () => {
      const taskId = 'task-123';
      const request = UpdateTaskDtoBuilder.build({
        description: undefined,
        status: undefined
      });
      const { user } = UserEntityBuilder.build();
      const updatedTask = TaskEntityBuilder.build(user, {
        id: taskId,
        title: request.title,
        description: '',
        status: 'pending'
      });

      currentUserService.setUser({
        userId: user.id,
        email: user.email
      });

      taskRepositoryMock.update.mockResolvedValue(updatedTask);

      const result = await sut.execute(taskId, request);

      expect(result).toEqual(updatedTask);
      expect(taskRepositoryMock.update).toHaveBeenCalledWith(
        taskId,
        expect.objectContaining({
          description: '',
          status: 'pending'
        }),
        user.id
      );
    });
  });

  describe('Error cases', () => {
    it('should throw error when user not found', async () => {
      const taskId = 'task-123';
      const request = UpdateTaskDtoBuilder.build();

      const act = () => sut.execute(taskId, request);

      await expect(act()).rejects.toThrow('User not set in CurrentUserService');
    });

    it('should throw NotFoundException when task does not exist', async () => {
      const taskId = 'non-existent-task';
      const request = UpdateTaskDtoBuilder.build();
      const { user } = UserEntityBuilder.build();

      currentUserService.setUser({
        userId: user.id,
        email: user.email
      });

      taskRepositoryMock.update.mockResolvedValue(null);

      const act = () => sut.execute(taskId, request);

      await expect(act()).rejects.toThrow(NotFoundException);
      await expect(act()).rejects.toThrow(`Task with id ${taskId} not found`);
    });

    it('should throw error when repository fails', async () => {
      const taskId = 'task-123';
      const request = UpdateTaskDtoBuilder.build();
      const { user } = UserEntityBuilder.build();
      const repositoryError = new Error('Database connection failed');

      currentUserService.setUser({
        userId: user.id,
        email: user.email
      });

      taskRepositoryMock.update.mockRejectedValue(repositoryError);

      const act = () => sut.execute(taskId, request);

      await expect(act()).rejects.toThrow('Database connection failed');
    });
  });
});