import { Controller, Post, Body, Inject, Get, Put, Delete, Param, Query } from '@nestjs/common';
import { ICreateTaskUseCase } from '../../application/use-cases/task/interfaces/create-task.usecase';
import { CreateTaskDto } from '../../application/dtos/task/create-task.dto';
import { Task } from '../../domain/entities/task.entity';
import { UpdateTaskDto } from 'src/application/dtos/task/update-task.dto';
import { IDeleteTaskUseCase } from 'src/application/use-cases/task/interfaces/delete-task.usecase';
import { IGetAllTasksUseCase } from 'src/application/use-cases/task/interfaces/get-all-tasks.usecase';
import { IGetTaskByIdUseCase } from 'src/application/use-cases/task/interfaces/get-task-by-id.usecase';
import { IUpdateTaskUseCase } from 'src/application/use-cases/task/interfaces/update-task.usecase';

@Controller('tasks')
export class TaskController {
  constructor(
    @Inject(ICreateTaskUseCase) private readonly createTaskUseCase: ICreateTaskUseCase,
    @Inject(IGetAllTasksUseCase) private readonly getAllTasksUseCase: IGetAllTasksUseCase,
    @Inject(IGetTaskByIdUseCase) private readonly getTaskByIdUseCase: IGetTaskByIdUseCase,
    @Inject(IUpdateTaskUseCase) private readonly updateTaskUseCase: IUpdateTaskUseCase,
    @Inject(IDeleteTaskUseCase) private readonly deleteTaskUseCase: IDeleteTaskUseCase,
  ) { }

  @Post()
  async create(@Body() body: CreateTaskDto): Promise<Task> {
    return await this.createTaskUseCase.execute(body);
  }

  @Get()
  async getAll(@Query('userId') userId: string) {
    return this.getAllTasksUseCase.execute(userId);
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Query('userId') userId: string) {
    return this.getTaskByIdUseCase.execute(id, userId);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Query('userId') userId: string, @Body() body: UpdateTaskDto) {
    return this.updateTaskUseCase.execute(id, userId, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Query('userId') userId: string) {
    return this.deleteTaskUseCase.execute(id, userId);
  }
}