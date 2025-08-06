import { ILoginUseCase } from 'src/application/use-cases/auth/interfaces/login.usecase';
import { LoginUseCase } from 'src/application/use-cases/auth/login.usecase';

export const AuthUseCaseProviders = [
  { provide: ILoginUseCase, useClass: LoginUseCase },
];
