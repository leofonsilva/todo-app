import { Controller, Post, Body, Inject } from '@nestjs/common';
import { RegisterUserDto } from 'src/user/application/dtos/register-user.dto';
import { IRegisterUserUseCase } from 'src/user/application/usecases/register-user.usecase.interface';

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
