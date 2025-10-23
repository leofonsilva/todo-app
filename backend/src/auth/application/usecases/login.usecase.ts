import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { IUserRepository } from 'src/user/domain/repositories/user.repository.interface';
import { LoginDto } from 'src/auth/application/dtos/login.dto';
import { AuthService } from 'src/auth/infrastructure/services/auth.service';
import { ILoginUseCase } from 'src/auth/application/usecases/login.usecase.interface';

@Injectable()
export class LoginUseCase implements ILoginUseCase {
  constructor(
    @Inject(IUserRepository) private readonly userRepo: IUserRepository,
    private readonly authService: AuthService,
  ) { }

  async execute(request: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userRepo.findByEmail(request.email);

    if (!user || !(await this.authService.comparePassword(request.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.authService.generateToken(user);
  }
}