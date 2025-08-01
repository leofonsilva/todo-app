import { CreateTaskDto } from '../../dtos/create-task.dto';
import { Task } from '../../../domain/entities/task.entity';

export const ICreateTaskUseCase = Symbol('ICreateTaskUseCase');

export interface ICreateTaskUseCase {
  execute(data: CreateTaskDto): Promise<Task>;
}