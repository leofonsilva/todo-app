import { IRegisterUserUseCase } from 'src/application/use-cases/user/interfaces/register-user.usecase';
import { RegisterUserUseCase } from 'src/application/use-cases/user/register-user.usecase';

export const UserUseCaseProviders = [
  { provide: IRegisterUserUseCase, useClass: RegisterUserUseCase }
];
