import { Injectable, Inject } from '@nestjs/common';
import { ICreateTaskUseCase } from './interfaces/create-task.usecase';
import { ITaskRepository } from 'src/domain/repositories/task.repository';
import { Task } from 'src/domain/entities/task.entity';
import { CreateTaskDto } from 'src/application/dtos/task/create-task.dto';

@Injectable()
export class CreateTaskUseCase implements ICreateTaskUseCase {
  constructor(
    @Inject(ITaskRepository) private readonly taskRepository: ITaskRepository
  ) { }

  async execute(data: CreateTaskDto): Promise<Task> {
    const task = new Task(
      '',
      data.userId,
      data.title,
      data.description || '',
      'pending',
      new Date()
    );

    return await this.taskRepository.create(task);
  }
}
