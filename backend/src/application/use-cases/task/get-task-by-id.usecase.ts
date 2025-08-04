import { Injectable, Inject } from '@nestjs/common';
import { ITaskRepository } from '../../../domain/repositories/task.repository';
import { IGetTaskByIdUseCase } from './interfaces/get-task-by-id.usecase';
import { Task } from '../../../domain/entities/task.entity';

@Injectable()
export class GetTaskByIdUseCase implements IGetTaskByIdUseCase {
  constructor(
    @Inject(ITaskRepository) private readonly repo: ITaskRepository
  ) { }

  execute(id: string, userId: string): Promise<Task | null> {
    return this.repo.findById(id, userId);
  }
}
