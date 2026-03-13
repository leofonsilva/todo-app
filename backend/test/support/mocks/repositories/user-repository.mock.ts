import { IUserRepository } from 'src/modules/user/domain/repositories/user.repository.interface';

export class UserRepositoryMock implements IUserRepository {
  public create = jest.fn();
  public findById = jest.fn();
  public findByEmail = jest.fn();

  // Limpar métodos
  clearMocks(): void {
    this.create.mockClear();
    this.findById.mockClear();
    this.findByEmail.mockClear();
  }
}