import { Injectable, Inject } from '@nestjs/common';
import { IUpdateTaskUseCase } from './interfaces/update-task.usecase';
import { ITaskRepository } from '../../../domain/repositories/task.repository';
import { Task } from '../../../domain/entities/task.entity';
import { UpdateTaskDto } from '../../dtos/task/update-task.dto';

@Injectable()
export class UpdateTaskUseCase implements IUpdateTaskUseCase {
  constructor(
    @Inject(ITaskRepository) private readonly repo: ITaskRepository
  ) { }

  async execute(id: string, userId: string, data: UpdateTaskDto): Promise<Task> {
    return this.repo.update(id, data, userId);
  }
}
