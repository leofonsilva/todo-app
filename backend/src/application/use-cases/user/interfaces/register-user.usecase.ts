import { RegisterUserDto } from 'src/application/dtos/user/register-user.dto';

export const IRegisterUserUseCase = Symbol('IRegisterUserUseCase');

export interface IRegisterUserUseCase {
  execute(data: RegisterUserDto): Promise<{ access_token: string }>;
}
