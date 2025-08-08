import { Controller, Post, Body, Inject, Get, Put, Delete, Param, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ICreateTaskUseCase } from 'src/task/application/usecases/create-task.usecase.interface';
import { IDeleteTaskUseCase } from 'src/task/application/usecases/delete-task.usecase.interface';
import { IGetAllTasksUseCase } from 'src/task/application/usecases/get-all-tasks.usecase.interface';
import { IGetTaskByIdUseCase } from 'src/task/application/usecases/get-task-by-id.usecase.interface';
import { IUpdateTaskUseCase } from 'src/task/application/usecases/update-task.usecase.interface';
import { CreateTaskDto } from 'src/task/application/dtos/create-task.dto';
import { UpdateTaskDto } from 'src/task/application/dtos/update-task.dto';
import { Task } from 'src/task/domain/entities/task.entity';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
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
  async getAll() {
    return this.getAllTasksUseCase.execute();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.getTaskByIdUseCase.execute(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateTaskDto) {
    return this.updateTaskUseCase.execute(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.deleteTaskUseCase.execute(id);
  }
}