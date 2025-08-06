import { Controller, Post, Body, Inject } from '@nestjs/common';
import { RegisterUserDto } from 'src/application/dtos/user/register-user.dto';
import { IRegisterUserUseCase } from 'src/application/use-cases/user/interfaces/register-user.usecase';

@Controller('users')
export class UserController {
  constructor(
    @Inject(IRegisterUserUseCase) private readonly registerUseCase: IRegisterUserUseCase,
  ) { }

  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    return this.registerUseCase.execute(dto);
  }
}
