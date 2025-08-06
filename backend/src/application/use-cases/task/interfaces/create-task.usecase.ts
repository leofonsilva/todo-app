import { CreateTaskDto } from 'src/application/dtos/task/create-task.dto';
import { Task } from 'src/domain/entities/task.entity';

export const ICreateTaskUseCase = Symbol('ICreateTaskUseCase');

export interface ICreateTaskUseCase {
  execute(data: CreateTaskDto): Promise<Task>;
}
