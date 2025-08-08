import { Controller, Post, Body, Inject, Get, Query } from '@nestjs/common';
import { RegisterUserDto } from 'src/user/application/dtos/register-user.dto';
import { IRegisterUserUseCase } from 'src/user/application/usecases/register-user.usecase.interface';
import { GetUserByEmailDto } from 'src/user/application/dtos/get-user-by-email.dto';
import { IGetUserByEmailUseCase } from 'src/user/application/usecases/get-user-by-email.usecase.interface';

@Controller('users')
export class UserController {
  constructor(
    @Inject(IRegisterUserUseCase) private readonly registerUseCase: IRegisterUserUseCase,
    @Inject(IGetUserByEmailUseCase) private readonly getUserByEmailUseCase: IGetUserByEmailUseCase
  ) { }

  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    return this.registerUseCase.execute(dto);
  }

  @Get('by-email')
  async getByEmail(@Query() query: GetUserByEmailDto) {
    return this.getUserByEmailUseCase.execute(query.email);
  }
}
