import { Injectable, Inject } from '@nestjs/common';
import { ITaskRepository } from 'src/task/domain/repositories/task.repository.interface';
import { IGetTaskByIdUseCase } from './get-task-by-id.usecase.interface';
import { Task } from 'src/task/domain/entities/task.entity';

@Injectable()
export class GetTaskByIdUseCase implements IGetTaskByIdUseCase {
  constructor(
    @Inject(ITaskRepository) private readonly taskRepository: ITaskRepository
  ) { }

  execute(id: string, userId: string): Promise<Task | null> {
    return this.taskRepository.findById(id, userId);
  }
}
