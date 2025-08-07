import { Injectable, Inject } from '@nestjs/common';
import { IUpdateTaskUseCase } from './update-task.usecase.interface';
import { ITaskRepository } from 'src/task/domain/repositories/task.repository.interface';
import { Task } from 'src/task/domain/entities/task.entity';
import { UpdateTaskDto } from 'src/task/application/dtos/update-task.dto';

@Injectable()
export class UpdateTaskUseCase implements IUpdateTaskUseCase {
  constructor(
    @Inject(ITaskRepository) private readonly taskRepository: ITaskRepository
  ) { }

  async execute(id: string, userId: string, data: UpdateTaskDto): Promise<Task> {
    return this.taskRepository.update(id, data, userId);
  }
}
