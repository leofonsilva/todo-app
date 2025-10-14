import { Test } from '@nestjs/testing';
import { CreateTaskUseCase } from 'src/task/application/usecases/create-task.usecase';
import { ITaskRepository } from 'src/task/domain/repositories/task.repository.interface';
import { CurrentUserService } from 'src/shared/services/current-user.service';
import { UserBuilder } from 'test/builders/entities/user.builder';
import { TaskBuilder } from 'test/builders/entities/task.builder';
import { CreateTaskRequestBuilder } from 'test/builders/requests/create-task-request.builder';
import { MockTaskRepository } from 'test/support/mocks/task-repository.mock';
import { setupTestEnvironment, cleanupTestEnvironment } from 'test/support/utils/test-setup';

describe('CreateTaskUseCase', () => {
  let createTaskUseCase: CreateTaskUseCase;
  let mockTaskRepository: MockTaskRepository;
  let currentUserService: CurrentUserService;

  beforeAll(() => {
    setupTestEnvironment();
  });

  beforeEach(async () => {
    mockTaskRepository = new MockTaskRepository();
    currentUserService = new CurrentUserService();

    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateTaskUseCase,
        { provide: ITaskRepository, useValue: mockTaskRepository },
        { provide: CurrentUserService, useValue: currentUserService }
      ],
    }).compile();

    createTaskUseCase = moduleRef.get<CreateTaskUseCase>(CreateTaskUseCase);
  });

  afterEach(() => {
    cleanupTestEnvironment();
  });

  describe('Success cases', () => {
    it('should create task successfully with all data', async () => {
      // Arrange
      const { user } = UserBuilder.build();
      const request = CreateTaskRequestBuilder.build();
      const expectedTask = TaskBuilder.build(user, {
        title: request.title,
        description: request.description!,
      });

      currentUserService.setUser({
        userId: user.id,
        email: user.email
      });

      mockTaskRepository.mockCreateSuccess(expectedTask);

      // Act
      const result = await createTaskUseCase.execute(request);

      // Assert
      expect(result).toEqual(expectedTask);
      expect(mockTaskRepository.create).toHaveBeenCalledWith(
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
      // Arrange
      const request = CreateTaskRequestBuilder.build();

      // Não configura usuário - currentUserService.getUser() vai lançar erro
      // currentUserService.setUser();

      // Act & Assert
      await expect(createTaskUseCase.execute(request))
        .rejects
        .toThrow('User not set in CurrentUserService');
    });

    it('should throw error when repository fails', async () => {
      // Arrange
      const { user } = UserBuilder.build();
      const request = CreateTaskRequestBuilder.build();
      const repositoryError = new Error('Database connection failed');

      currentUserService.setUser({
        userId: user.id,
        email: user.email
      });

      mockTaskRepository.mockCreateError(repositoryError);

      // Act & Assert
      await expect(createTaskUseCase.execute(request))
        .rejects
        .toThrow('Database connection failed');
    });
  });
});