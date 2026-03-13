import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { IUserRepository } from 'src/modules/user/domain/repositories/user.repository.interface';
import { RegisterUserDto } from 'src/modules/user/application/dtos/register-user.dto';
import { AuthService } from 'src/modules/auth/infrastructure/services/auth.service';
import { IRegisterUserUseCase } from './register-user.usecase.interface';

@Injectable()
export class RegisterUserUseCase implements IRegisterUserUseCase {
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
    private readonly authService: AuthService,
  ) { }

  async execute(request: RegisterUserDto): Promise<{ access_token: string }> {
    const exists = await this.userRepository.findByEmail(request.email);

    if (exists) {
      throw new ConflictException('Email already in use');
    }

    const hashed = await this.authService.hashPassword(request.password);

    const user = await this.userRepository.create({
      id: '',
      name: request.name,
      email: request.email,
      password: hashed,
      createdAt: new Date(),
    });

    return this.authService.generateToken(user);
  }
}
