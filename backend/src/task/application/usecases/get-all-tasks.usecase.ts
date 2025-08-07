import { Injectable, Inject } from '@nestjs/common';
import { ITaskRepository } from 'src/task/domain/repositories/task.repository.interface';
import { Task } from 'src/task/domain/entities/task.entity';
import { IGetAllTasksUseCase } from './get-all-tasks.usecase.interface';

@Injectable()
export class GetAllTasksUseCase implements IGetAllTasksUseCase {
  constructor(
    @Inject(ITaskRepository) private readonly taskRepository: ITaskRepository
  ) { }

  execute(userId: string): Promise<Task[]> {
    return this.taskRepository.findAll(userId);
  }
}
