import { CreateTaskDto } from 'src/modules/task/application/dtos/create-task.dto';
import { Task } from 'src/modules/task/domain/entities/task.entity';

export const ICreateTaskUseCase = Symbol('ICreateTaskUseCase');

export interface ICreateTaskUseCase {
  execute(request: CreateTaskDto): Promise<Task>;
}
