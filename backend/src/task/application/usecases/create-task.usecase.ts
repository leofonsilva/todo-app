import { Injectable, Inject } from '@nestjs/common';
import { ICreateTaskUseCase } from './create-task.usecase.interface';
import { ITaskRepository } from 'src/task/domain/repositories/task.repository.interface';
import { Task } from 'src/task/domain/entities/task.entity';
import { CreateTaskDto } from 'src/task/application/dtos/create-task.dto';

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
