import { LoginDto } from 'src/application/dtos/auth/login.dto';

export const ILoginUseCase = Symbol('ILoginUseCase');

export interface ILoginUseCase {
  execute(data: LoginDto): Promise<{ access_token: string }>;
}