import { LoginDto } from 'src/modules/auth/application/dtos/login.dto';

export const ILoginUseCase = Symbol('ILoginUseCase');

export interface ILoginUseCase {
  execute(request: LoginDto): Promise<{ access_token: string }>;
}