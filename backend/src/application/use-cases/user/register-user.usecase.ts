import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { RegisterUserDto } from 'src/application/dtos/user/register-user.dto';
import { AuthService } from 'src/infrastructure/auth/auth.service';
import { IRegisterUserUseCase } from './interfaces/register-user.usecase';

@Injectable()
export class RegisterUserUseCase implements IRegisterUserUseCase {
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
    private readonly authService: AuthService,
  ) { }

  async execute(data: RegisterUserDto) {
    const exists = await this.userRepository.findByEmail(data.email);

    if (exists) {
      throw new ConflictException('Email already in use');
    }

    const hashed = await this.authService.hashPassword(data.password);

    const user = await this.userRepository.create({
      id: '',
      name: data.name,
      email: data.email,
      password: hashed,
      createdAt: new Date(),
    });

    return this.authService.generateToken(user);
  }
}
