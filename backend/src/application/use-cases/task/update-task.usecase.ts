import { Injectable, Inject } from '@nestjs/common';
import { IUpdateTaskUseCase } from './interfaces/update-task.usecase';
import { ITaskRepository } from 'src/domain/repositories/task.repository';
import { Task } from 'src/domain/entities/task.entity';
import { UpdateTaskDto } from 'src/application/dtos/task/update-task.dto';

@Injectable()
export class UpdateTaskUseCase implements IUpdateTaskUseCase {
  constructor(
    @Inject(ITaskRepository) private readonly taskRepository: ITaskRepository
  ) { }

  async execute(id: string, userId: string, data: UpdateTaskDto): Promise<Task> {
    return this.taskRepository.update(id, data, userId);
  }
}
