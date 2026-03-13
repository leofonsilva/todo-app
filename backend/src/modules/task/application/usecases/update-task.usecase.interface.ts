import { UpdateTaskDto } from 'src/modules/task/application/dtos/update-task.dto';
import { Task } from 'src/modules/task/domain/entities/task.entity';

export const IUpdateTaskUseCase = Symbol('IUpdateTaskUseCase');

export interface IUpdateTaskUseCase {
  execute(id: string, request: UpdateTaskDto): Promise<Task>;
}
