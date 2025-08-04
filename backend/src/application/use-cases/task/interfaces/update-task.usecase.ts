import { UpdateTaskDto } from 'src/application/dtos/task/update-task.dto';
import { Task } from '../../../../domain/entities/task.entity';

export const IUpdateTaskUseCase = Symbol('IUpdateTaskUseCase');

export interface IUpdateTaskUseCase {
  execute(id: string, userId: string, data: UpdateTaskDto): Promise<Task>;
}
