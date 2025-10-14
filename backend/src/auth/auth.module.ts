import { ConfigModule, ConfigService } from '@nestjs/config';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { LoginUseCase } from 'src/auth/application/usecases/login.usecase';
import { AuthService } from 'src/auth/infrastructure/services/auth.service';
import { JwtStrategy } from 'src/auth/infrastructure/strategies/jwt.strategy';
import { AuthController } from 'src/auth/presentation/auth.controller';

import { UserModule } from 'src/user/user.module';

import { ILoginUseCase } from './application/usecases/login.usecase.interface';
import { JwtExpiresIn } from 'src/shared/types/jwt';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<JwtExpiresIn>('JWT_EXPIRES_IN') },
      }),
    }),
    forwardRef(() => UserModule)
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,

    { provide: ILoginUseCase, useClass: LoginUseCase },
  ],
  exports: [
    AuthService,
    JwtModule
  ],
})
export class AuthModule { }