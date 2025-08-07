import { Task } from 'src/task/domain/entities/task.entity';

export const IGetTaskByIdUseCase = Symbol('IGetTaskByIdUseCase');

export interface IGetTaskByIdUseCase {
  execute(id: string, userId: string): Promise<Task | null>;
}
