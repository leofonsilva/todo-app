import { GetUserByEmailResponseDto } from '../dtos/get-user-by-email.response.dto';

export const IGetUserByEmailUseCase = Symbol('IGetUserByEmailUseCase');

export interface IGetUserByEmailUseCase {
  execute(): Promise<GetUserByEmailResponseDto>;
}
