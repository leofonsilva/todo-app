import { Injectable, Inject } from '@nestjs/common';
import { ICreateTaskUseCase } from './interfaces/create-task.usecase';
import { ITaskRepository } from '../../domain/repositories/task.repository';
import { Task } from '../../domain/entities/task.entity';
import { CreateTaskDto } from '../dtos/create-task.dto';

@Injectable()
export class CreateTaskUseCase implements ICreateTaskUseCase {
  constructor(
    @Inject(ITaskRepository)
    private readonly repo: ITaskRepository
  ) {}

  async execute(data: CreateTaskDto): Promise<Task> {
    const task = new Task(
      '', // ID gerado pelo Mongo
      data.userId,
      data.title,
      data.description,
      'pending',
      new Date()
    );
    
    return await this.repo.create(task);
  }
}