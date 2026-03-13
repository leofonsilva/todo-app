import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RegisterUserUseCase } from 'src/modules/user/application/usecases/register-user.usecase';
import { UserRepository } from 'src/modules/user/infrastructure/repositories/user.repository';
import { UserSchema } from 'src/modules/user/infrastructure/schemas/user.schema';
import { UserController } from 'src/modules/user/presentation/user.controller';

import { AuthModule } from 'src/modules/auth/auth.module';

import { IRegisterUserUseCase } from './application/usecases/register-user.usecase.interface';
import { IUserRepository } from './domain/repositories/user.repository.interface';
import { IGetUserByEmailUseCase } from './application/usecases/get-user-by-email.usecase.interface';
import { GetUserByEmailUseCase } from './application/usecases/get-user-by-email.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    forwardRef(() => AuthModule)
  ],
  controllers: [UserController],
  providers: [
    UserRepository,
    { provide: IUserRepository, useExisting: UserRepository },

    { provide: IRegisterUserUseCase, useClass: RegisterUserUseCase },
    { provide: IGetUserByEmailUseCase, useClass: GetUserByEmailUseCase }
  ],
  exports: [
    UserRepository,
    IUserRepository
  ],
})
export class UserModule { }
