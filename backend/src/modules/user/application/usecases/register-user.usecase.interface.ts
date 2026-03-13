import { RegisterUserDto } from 'src/modules/user/application/dtos/register-user.dto';

export const IRegisterUserUseCase = Symbol('IRegisterUserUseCase');

export interface IRegisterUserUseCase {
  execute(request: RegisterUserDto): Promise<{ access_token: string }>;
}
