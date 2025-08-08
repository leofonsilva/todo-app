import { Inject, Injectable } from '@nestjs/common';
import { IGetUserByEmailUseCase } from './get-user-by-email.usecase.interface';
import { IUserRepository } from 'src/user/domain/repositories/user.repository.interface';
import { GetUserByEmailResponseDto } from '../dtos/get-user-by-email.reponse.dto';

@Injectable()
export class GetUserByEmailUseCase implements IGetUserByEmailUseCase {
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
  ) { }

  async execute(email: string): Promise<GetUserByEmailResponseDto | null> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return null;
    }

    return Object.assign(new GetUserByEmailResponseDto(), {
      id: user.id,
      name: user.name,
      email: user.email
    });
  }
}
