import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IGetUserByEmailUseCase } from './get-user-by-email.usecase.interface';
import { IUserRepository } from 'src/user/domain/repositories/user.repository.interface';
import { GetUserByEmailResponseDto } from '../dtos/get-user-by-email.response.dto';
import { CurrentUserService } from 'src/shared/services/current-user.service';

@Injectable()
export class GetUserByEmailUseCase implements IGetUserByEmailUseCase {
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
    private readonly currentUserService: CurrentUserService
  ) { }

  async execute(): Promise<GetUserByEmailResponseDto> {
    const userEmail = this.currentUserService.getEmail();
    const user = await this.userRepository.findByEmail(userEmail);

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return Object.assign(new GetUserByEmailResponseDto(), {
      id: user.id,
      name: user.name,
      email: user.email
    });
  }
}
