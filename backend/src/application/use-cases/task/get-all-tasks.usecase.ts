import { Injectable, Inject } from '@nestjs/common';
import { ITaskRepository } from '../../../domain/repositories/task.repository';
import { Task } from '../../../domain/entities/task.entity';
import { IGetAllTasksUseCase } from './interfaces/get-all-tasks.usecase';

@Injectable()
export class GetAllTasksUseCase implements IGetAllTasksUseCase {
  constructor(
    @Inject(ITaskRepository) private readonly repo: ITaskRepository
  ) { }

  execute(userId: string): Promise<Task[]> {
    return this.repo.findAll(userId);
  }
}
