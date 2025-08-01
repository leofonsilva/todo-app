import { ITaskRepository } from '../../domain/repositories/task.repository';
import { Task } from '../../domain/entities/task.entity';
import { CreateTaskDto } from '../dtos/create-task.dto';

export class CreateTaskUseCase {
  constructor(private readonly repo: ITaskRepository) {}

  async execute(data: CreateTaskDto): Promise<Task> {
    const task = new Task(
      '', // o Mongo gerará o ID
      data.userId,
      data.title,
      data.description,
      'pending',
      new Date()
    );
    return this.repo.create(task);
  }
}