import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ICreateTaskUseCase } from '../../application/use-cases/interfaces/create-task.usecase';
import { CreateTaskDto } from '../../application/dtos/create-task.dto';
import { Task } from '../../domain/entities/task.entity';

@Controller('tasks')
export class TaskController {
  constructor(
    @Inject(ICreateTaskUseCase)
    private readonly createTaskUseCase: ICreateTaskUseCase
  ) {}

  @Post()
  async create(@Body() body: CreateTaskDto): Promise<Task> {
    return await this.createTaskUseCase.execute(body);
  }
}