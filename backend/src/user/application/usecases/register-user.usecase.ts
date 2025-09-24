import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { IUserRepository } from 'src/user/domain/repositories/user.repository.interface';
import { RegisterUserDto } from 'src/user/application/dtos/register-user.dto';
import { AuthService } from 'src/auth/infrastructure/services/auth.service';
import { IRegisterUserUseCase } from './register-user.usecase.interface';

@Injectable()
export class RegisterUserUseCase implements IRegisterUserUseCase {
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
    private readonly authService: AuthService,
  ) { }

  async execute(data: RegisterUserDto): Promise<{ access_token: string }> {
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
