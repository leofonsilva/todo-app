import { Controller, Post, Body, Inject, Get, UseGuards } from '@nestjs/common';
import { RegisterUserDto } from 'src/user/application/dtos/register-user.dto';
import { IRegisterUserUseCase } from 'src/user/application/usecases/register-user.usecase.interface';
import { IGetUserByEmailUseCase } from 'src/user/application/usecases/get-user-by-email.usecase.interface';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { GetUserByEmailResponseDto } from '../application/dtos/get-user-by-email.reponse.dto';

@Controller('users')
export class UserController {
  constructor(
    @Inject(IRegisterUserUseCase) private readonly registerUseCase: IRegisterUserUseCase,
    @Inject(IGetUserByEmailUseCase) private readonly getUserByEmailUseCase: IGetUserByEmailUseCase
  ) { }

  @Post('register')
  async register(@Body() request: RegisterUserDto): Promise<{ access_token: string }> {
    return this.registerUseCase.execute(request);
  }

  @UseGuards(JwtAuthGuard)
  @Get('by-email')
  async getByEmail(): Promise<GetUserByEmailResponseDto> {
    return this.getUserByEmailUseCase.execute();
  }
}
