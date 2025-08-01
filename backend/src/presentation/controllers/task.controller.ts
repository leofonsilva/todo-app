import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { CreateTaskDto } from '../../application/dtos/create-task.dto';
import { TaskMongoRepository } from '../../infrastructure/database/repositories/task-mongo.repository';
import { CreateTaskUseCase } from '../../application/use-cases/create-task.usecase';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskRepo: TaskMongoRepository) {}

  @Post()
  async create(@Body() body: CreateTaskDto) {
    const useCase = new CreateTaskUseCase(this.taskRepo);
    return await useCase.execute(body);
  }
}