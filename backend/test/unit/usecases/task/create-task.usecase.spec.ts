import { Test } from '@nestjs/testing';
import { CreateTaskUseCase } from 'src/task/application/usecases/create-task.usecase';
import { ITaskRepository } from 'src/task/domain/repositories/task.repository.interface';
import { CurrentUserService } from 'src/shared/services/current-user.service';
import { UserEntityBuilder } from 'test/support/builders/entities/user.entity.builder';
import { TaskEntityBuilder } from 'test/support/builders/entities/task.entity.builder';
import { CreateTaskDtoBuilder } from 'test/support/builders/dto/create-task.dto.builder';
import { TaskRepositoryMock } from 'test/support/mocks/repositories/task-repository.mock';

describe('CreateTaskUseCase', () => {
  let sut: CreateTaskUseCase;
  let taskRepositoryMock: TaskRepositoryMock;
  let currentUserService: CurrentUserService;

  beforeEach(async () => {
    taskRepositoryMock = new TaskRepositoryMock();
    currentUserService = new CurrentUserService();

    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateTaskUseCase,
        { provide: ITaskRepository, useValue: taskRepositoryMock },
        { provide: CurrentUserService, useValue: currentUserService }
      ],
    }).compile();

    sut = moduleRef.get<CreateTaskUseCase>(CreateTaskUseCase);
  });

  describe('Success cases', () => {
    it('should create task successfully with all data', async () => {
      const request = CreateTaskDtoBuilder.build();
      const { user } = UserEntityBuilder.build();
      const taskEntity = TaskEntityBuilder.build(user, {
        title: request.title,
        description: request.description
      });

      currentUserService.setUser({
        userId: user.id,
        email: user.email
      });

      taskRepositoryMock.create.mockResolvedValue(taskEntity);

      const result = await sut.execute(request);

      expect(result).toEqual(taskEntity);
      expect(taskRepositoryMock.create).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: user.id,
          title: request.title,
          description: request.description,
          status: 'pending',
        })
      );
    });
  });

  describe('Error cases', () => {
    it('should throw error when user not found', async () => {
      const request = CreateTaskDtoBuilder.build();

      const act = () => sut.execute(request);

      await expect(act()).rejects.toThrow('User not set in CurrentUserService');
    });

    it('should throw error when repository fails', async () => {
      const request = CreateTaskDtoBuilder.build();
      const { user } = UserEntityBuilder.build();
      const repositoryError = new Error('Database connection failed');

      currentUserService.setUser({
        userId: user.id,
        email: user.email
      });

      taskRepositoryMock.create.mockRejectedValue(repositoryError);

      const act = () => sut.execute(request);

      await expect(act()).rejects.toThrow('Database connection failed');
    });
  });
});
