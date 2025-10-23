import { User } from 'src/user/domain/entities/user.entity';
import { IUserRepository } from 'src/user/domain/repositories/user.repository.interface';

export class UserRepositoryMock implements IUserRepository {
  public create = jest.fn();
  public findById = jest.fn();
  public findByEmail = jest.fn();

  // Create
  createSuccess(user: User): void {
    this.create.mockResolvedValue(user);
  }

  createError(error: Error): void {
    this.create.mockRejectedValue(error);
  }

  // Find by ID
  findByIdSuccess(user: User | null): void {
    this.findById.mockResolvedValue(user);
  }

  findByIdError(error: Error): void {
    this.findById.mockRejectedValue(error);
  }

  // Find by Email
  findByEmailSuccess(user: User | null): void {
    this.findByEmail.mockResolvedValue(user);
  }

  findByEmailError(error: Error): void {
    this.findByEmail.mockRejectedValue(error);
  }

  // Limpar métodos
  clearMocks(): void {
    this.create.mockClear();
    this.findById.mockClear();
    this.findByEmail.mockClear();
  }
}