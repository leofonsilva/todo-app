import { Task } from 'src/task/domain/entities/task.entity';
import { ITaskRepository } from 'src/task/domain/repositories/task.repository.interface';

export class MockTaskRepository implements ITaskRepository {
  public create = jest.fn();
  public findAll = jest.fn();
  public findById = jest.fn();
  public findByUserId = jest.fn();
  public update = jest.fn();
  public delete = jest.fn();

  // Create
  createSuccess(task: Task): void {
    this.create.mockResolvedValue(task);
  }

  createError(error: Error): void {
    this.create.mockRejectedValue(error);
  }

  // Find
  findAllSuccess(tasks: Task[]): void {
    this.findAll.mockResolvedValue(tasks);
  }

  findByIdSuccess(task: Task | null): void {
    this.findById.mockResolvedValue(task);
  }

  findByUserSuccess(tasks: Task[]): void {
    this.findByUserId.mockResolvedValue(tasks);
  }

  // Update  
  updateSuccess(task: Task): void {
    this.update.mockResolvedValue(task);
  }

  // Delete
  deleteSuccess(): void {
    this.delete.mockResolvedValue(undefined);
  }

  // Limpar métodos
  clearMocks(): void {
    this.create.mockClear();
    this.findAll.mockClear();
    this.findById.mockClear();
    this.findByUserId.mockClear();
    this.update.mockClear();
    this.delete.mockClear();
  }
}
