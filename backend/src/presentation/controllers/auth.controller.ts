import { Controller, Post, Body, Inject } from '@nestjs/common';
import { LoginDto } from 'src/application/dtos/auth/login.dto';
import { LoginUseCase } from 'src/application/use-cases/auth/login.usecase';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(LoginUseCase) private readonly loginUseCase: LoginUseCase
  ) { }

  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.loginUseCase.execute(body);
  }
}
