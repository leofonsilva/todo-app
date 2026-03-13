import { ITaskRepository } from 'src/modules/task/domain/repositories/task.repository.interface';

export class TaskRepositoryMock implements ITaskRepository {
  public create = jest.fn();
  public findAll = jest.fn();
  public findById = jest.fn();
  public findByUserId = jest.fn();
  public update = jest.fn();
  public delete = jest.fn();
  public count = jest.fn();

  // Limpar métodos
  clearMocks(): void {
    this.create.mockClear();
    this.findAll.mockClear();
    this.findById.mockClear();
    this.findByUserId.mockClear();
    this.update.mockClear();
    this.delete.mockClear();
    this.count.mockClear();
  }
}
