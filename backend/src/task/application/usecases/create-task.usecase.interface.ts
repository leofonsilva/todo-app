import { CreateTaskDto } from 'src/task/application/dtos/create-task.dto';
import { Task } from 'src/task/domain/entities/task.entity';

export const ICreateTaskUseCase = Symbol('ICreateTaskUseCase');

export interface ICreateTaskUseCase {
  execute(request: CreateTaskDto): Promise<Task>;
}
