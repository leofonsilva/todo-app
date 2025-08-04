import { Task } from '../../../../domain/entities/task.entity';

export const IGetAllTasksUseCase = Symbol('IGetAllTasksUseCase');

export interface IGetAllTasksUseCase {
  execute(userId: string): Promise<Task[]>;
}
