import { CreateTaskDto } from '../../../dtos/task/create-task.dto';
import { Task } from '../../../../domain/entities/task.entity';

export const ICreateTaskUseCase = Symbol('ICreateTaskUseCase');

export interface ICreateTaskUseCase {
  execute(data: CreateTaskDto): Promise<Task>;
}
