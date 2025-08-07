import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RegisterUserUseCase } from 'src/user/application/usecases/register-user.usecase';
import { UserRepository } from 'src/user/infrastructure/repositories/user.repository';
import { UserSchema } from 'src/user/infrastructure/schemas/user.schema';
import { UserController } from 'src/user/presentation/user.controller';

import { AuthModule } from 'src/auth/auth.module';

import { IRegisterUserUseCase } from './application/usecases/register-user.usecase.interface';
import { IUserRepository } from './domain/repositories/user.repository.interface';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    forwardRef(() => AuthModule)
  ],
  controllers: [UserController],
  providers: [
    UserRepository,
    { provide: IUserRepository, useExisting: UserRepository },

    { provide: IRegisterUserUseCase, useClass: RegisterUserUseCase }
  ],
  exports: [
    UserRepository,
    IUserRepository
  ],
})
export class UserModule { }
