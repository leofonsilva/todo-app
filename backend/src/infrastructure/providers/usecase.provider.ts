import { TaskUseCaseProviders } from './use-cases/task-usecase.provider';
import { UserUseCaseProviders } from './use-cases/user.usecase.provider';

export const UseCaseProviders = [
  ...TaskUseCaseProviders,
  ...UserUseCaseProviders
];