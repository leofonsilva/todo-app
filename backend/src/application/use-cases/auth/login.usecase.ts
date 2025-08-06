import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { LoginDto } from 'src/application/dtos/auth/login.dto';
import { AuthService } from 'src/infrastructure/auth/auth.service';
import { ILoginUseCase } from 'src/application/use-cases/auth/interfaces/login.usecase';

@Injectable()
export class LoginUseCase implements ILoginUseCase {
  constructor(
    @Inject(IUserRepository) private readonly userRepo: IUserRepository,
    private readonly authService: AuthService,
  ) {}

  async execute(data: LoginDto) {
    const user = await this.userRepo.findByEmail(data.email);

    if (!user || !(await this.authService.comparePassword(data.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.authService.generateToken(user);
  }
}