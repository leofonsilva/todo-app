import { Task } from 'src/modules/task/domain/entities/task.entity';

export const IGetTaskByIdUseCase = Symbol('IGetTaskByIdUseCase');

export interface IGetTaskByIdUseCase {
  execute(id: string): Promise<Task>;
}
