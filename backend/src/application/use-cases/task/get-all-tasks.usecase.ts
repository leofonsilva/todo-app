import { Injectable, Inject } from '@nestjs/common';
import { ITaskRepository } from 'src/domain/repositories/task.repository';
import { Task } from 'src/domain/entities/task.entity';
import { IGetAllTasksUseCase } from './interfaces/get-all-tasks.usecase';

@Injectable()
export class GetAllTasksUseCase implements IGetAllTasksUseCase {
  constructor(
    @Inject(ITaskRepository) private readonly taskRepository: ITaskRepository
  ) { }

  execute(userId: string): Promise<Task[]> {
    return this.taskRepository.findAll(userId);
  }
}
