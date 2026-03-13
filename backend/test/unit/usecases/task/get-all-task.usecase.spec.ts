import { Test } from '@nestjs/testing';
import { GetAllTasksUseCase } from 'src/modules/task/application/usecases/get-all-tasks.usecase';
import { ITaskRepository } from 'src/modules/task/domain/repositories/task.repository.interface';
import { CurrentUserService } from 'src/shared/services/current-user.service';
import { UserEntityBuilder } from 'test/support/builders/entities/user.entity.builder';
import { TaskEntityBuilder } from 'test/support/builders/entities/task.entity.builder';
import { TaskFiltersDtoBuilder } from 'test/support/builders/dto/task-filters.dto.builder';
import { TaskRepositoryMock } from 'test/support/mocks/repositories/task-repository.mock';

describe('GetAllTasksUseCase', () => {
  let sut: GetAllTasksUseCase;
  let taskRepositoryMock: TaskRepositoryMock;
  let currentUserService: CurrentUserService;

  beforeEach(async () => {
    taskRepositoryMock = new TaskRepositoryMock();
    currentUserService = new CurrentUserService();

    const moduleRef = await Test.createTestingModule({
      providers: [
        GetAllTasksUseCase,
        { provide: ITaskRepository, useValue: taskRepositoryMock },
        { provide: CurrentUserService, useValue: currentUserService }
      ],
    }).compile();

    sut = moduleRef.get<GetAllTasksUseCase>(GetAllTasksUseCase);
  });

  describe('Success cases', () => {
    it('should get all tasks with default pagination', async () => {
      const { user } = UserEntityBuilder.build();
      const tasks = TaskEntityBuilder.buildCollection(user, 2);

      currentUserService.setUser({
        userId: user.id,
        email: user.email
      });

      taskRepositoryMock.findAll.mockResolvedValue(tasks);
      taskRepositoryMock.count.mockResolvedValue(2);

      const result = await sut.execute();

      expect(result.tasks).toEqual(tasks);
      expect(result.pagination.total).toBe(2);
      expect(result.pagination.page).toBe(1);
      expect(result.pagination.limit).toBe(10);
      expect(result.pagination.totalPages).toBe(1);
    });

    it('should apply search filter correctly', async () => {
      const { user } = UserEntityBuilder.build();
      const filters = TaskFiltersDtoBuilder.build({ search: 'important' });
      const tasks = TaskEntityBuilder.buildCollection(user, 1, { title: 'Important task' });

      currentUserService.setUser({
        userId: user.id,
        email: user.email
      });

      taskRepositoryMock.findAll.mockResolvedValue(tasks);
      taskRepositoryMock.count.mockResolvedValue(1);

      const result = await sut.execute(filters);

      expect(result.tasks).toEqual(tasks);
      expect(taskRepositoryMock.findAll).toHaveBeenCalledWith(
        user.id,
        expect.objectContaining({
          $or: [
            { title: { $regex: 'important', $options: 'i' } },
            { description: { $regex: 'important', $options: 'i' } }
          ]
        }),
        expect.any(Object)
      );
    });

    it('should apply status filter correctly', async () => {
      const { user } = UserEntityBuilder.build();
      const filters = TaskFiltersDtoBuilder.build({ status: 'done' });
      const tasks = TaskEntityBuilder.buildCollection(user, 1, { status: 'done' });

      currentUserService.setUser({
        userId: user.id,
        email: user.email
      });

      taskRepositoryMock.findAll.mockResolvedValue(tasks);
      taskRepositoryMock.count.mockResolvedValue(1);

      const result = await sut.execute(filters);

      expect(result.tasks).toEqual(tasks);
      expect(taskRepositoryMock.findAll).toHaveBeenCalledWith(
        user.id,
        expect.objectContaining({ status: 'done' }),
        expect.any(Object)
      );
    });

    it('should apply isCompleted filter for completed tasks', async () => {
      const { user } = UserEntityBuilder.build();
      const filters = TaskFiltersDtoBuilder.build({ isCompleted: true });
      const tasks = TaskEntityBuilder.buildCollection(user, 1, { status: 'done' });

      currentUserService.setUser({
        userId: user.id,
        email: user.email
      });

      taskRepositoryMock.findAll.mockResolvedValue(tasks);
      taskRepositoryMock.count.mockResolvedValue(1);

      const result = await sut.execute(filters);

      expect(result.tasks).toEqual(tasks);
      expect(taskRepositoryMock.findAll).toHaveBeenCalledWith(
        user.id,
        expect.objectContaining({ status: 'done' }),
        expect.any(Object)
      );
    });

    it('should apply isCompleted filter for pending tasks', async () => {
      const { user } = UserEntityBuilder.build();
      const filters = TaskFiltersDtoBuilder.build({ isCompleted: false });
      const tasks = TaskEntityBuilder.buildCollection(user, 2);

      currentUserService.setUser({
        userId: user.id,
        email: user.email
      });

      taskRepositoryMock.findAll.mockResolvedValue(tasks);
      taskRepositoryMock.count.mockResolvedValue(2);

      const result = await sut.execute(filters);

      expect(result.tasks).toEqual(tasks);
      expect(taskRepositoryMock.findAll).toHaveBeenCalledWith(
        user.id,
        expect.objectContaining({ status: { $in: ['pending', 'in-progress'] } }),
        expect.any(Object)
      );
    });

    it('should apply pagination correctly', async () => {
      const { user } = UserEntityBuilder.build();
      const filters = TaskFiltersDtoBuilder.build({ page: 2, limit: 5 });
      const tasks = TaskEntityBuilder.buildCollection(user, 5);

      currentUserService.setUser({
        userId: user.id,
        email: user.email
      });

      taskRepositoryMock.findAll.mockResolvedValue(tasks);
      taskRepositoryMock.count.mockResolvedValue(15);

      const result = await sut.execute(filters);

      expect(result.pagination.page).toBe(2);
      expect(result.pagination.limit).toBe(5);
      expect(result.pagination.total).toBe(15);
      expect(result.pagination.totalPages).toBe(3);
      
      expect(taskRepositoryMock.findAll).toHaveBeenCalledWith(
        user.id,
        expect.any(Object),
        expect.objectContaining({
          skip: 5, // (2-1) * 5
          limit: 5
        })
      );
    });

    it('should apply sorting correctly', async () => {
      const { user } = UserEntityBuilder.build();
      const filters = TaskFiltersDtoBuilder.build({ 
        sortBy: 'title', 
        sortOrder: 'asc' 
      });

      currentUserService.setUser({
        userId: user.id,
        email: user.email
      });

      taskRepositoryMock.findAll.mockResolvedValue([]);
      taskRepositoryMock.count.mockResolvedValue(0);

      await sut.execute(filters);

      expect(taskRepositoryMock.findAll).toHaveBeenCalledWith(
        user.id,
        expect.any(Object),
        expect.objectContaining({
          sort: { title: 1 } // asc = 1
        })
      );
    });

    it('should handle empty results', async () => {
      const { user } = UserEntityBuilder.build();
      const filters = TaskFiltersDtoBuilder.build();

      currentUserService.setUser({
        userId: user.id,
        email: user.email
      });

      taskRepositoryMock.findAll.mockResolvedValue([]);
      taskRepositoryMock.count.mockResolvedValue(0);

      const result = await sut.execute(filters);

      expect(result.tasks).toEqual([]);
      expect(result.pagination.total).toBe(0);
      expect(result.pagination.totalPages).toBe(0);
    });

    it('should handle large dataset with pagination', async () => {
      const { user } = UserEntityBuilder.build();
      const filters = TaskFiltersDtoBuilder.build({ page: 3, limit: 10 });
      const tasks = TaskEntityBuilder.buildCollection(user, 10);

      currentUserService.setUser({
        userId: user.id,
        email: user.email
      });

      taskRepositoryMock.findAll.mockResolvedValue(tasks);
      taskRepositoryMock.count.mockResolvedValue(100);

      const result = await sut.execute(filters);

      expect(result.tasks).toHaveLength(10);
      expect(result.pagination.total).toBe(100);
      expect(result.pagination.totalPages).toBe(10); // 100/10 = 10
      expect(result.pagination.page).toBe(3);
    });
  });

  describe('Error cases', () => {
    it('should throw error when user not found', async () => {
      const filters = TaskFiltersDtoBuilder.build();

      const act = () => sut.execute(filters);

      await expect(act()).rejects.toThrow('User not set in CurrentUserService');
    });

    it('should throw error when findAll repository fails', async () => {
      const { user } = UserEntityBuilder.build();
      const filters = TaskFiltersDtoBuilder.build();
      const repositoryError = new Error('Database connection failed');

      currentUserService.setUser({
        userId: user.id,
        email: user.email
      });

      taskRepositoryMock.findAll.mockRejectedValue(repositoryError);

      const act = () => sut.execute(filters);

      await expect(act()).rejects.toThrow('Database connection failed');
    });

    it('should throw error when count repository fails', async () => {
      const { user } = UserEntityBuilder.build();
      const filters = TaskFiltersDtoBuilder.build();
      const repositoryError = new Error('Count failed');

      currentUserService.setUser({
        userId: user.id,
        email: user.email
      });

      taskRepositoryMock.findAll.mockResolvedValue([]);
      taskRepositoryMock.count.mockRejectedValue(repositoryError);

      const act = () => sut.execute(filters);

      await expect(act()).rejects.toThrow('Count failed');
    });
  });
});
