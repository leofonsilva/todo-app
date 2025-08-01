import { ICreateTaskUseCase } from '../../application/use-cases/interfaces/create-task.usecase';
import { CreateTaskUseCase } from '../../application/use-cases/create-task.usecase';

export const UseCaseProviders = [
  {
    provide: ICreateTaskUseCase,
    useClass: CreateTaskUseCase,
  },
];