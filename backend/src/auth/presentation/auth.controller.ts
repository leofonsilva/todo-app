import { Controller, Post, Body, Inject, HttpCode } from '@nestjs/common';
import { LoginDto } from 'src/auth/application/dtos/login.dto';
import { ILoginUseCase } from 'src/auth/application/usecases/login.usecase.interface';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(ILoginUseCase) private readonly loginUseCase: ILoginUseCase
  ) { }

  @Post('login')
  @HttpCode(200)
  async login(@Body() body: LoginDto) {
    return this.loginUseCase.execute(body);
  }
}
