import { GetUserByEmailResponseDto } from '../dtos/get-user-by-email.reponse.dto';

export const IGetUserByEmailUseCase = Symbol('IGetUserByEmailUseCase');

export interface IGetUserByEmailUseCase {
  execute(email: string): Promise<GetUserByEmailResponseDto | null>;
}
