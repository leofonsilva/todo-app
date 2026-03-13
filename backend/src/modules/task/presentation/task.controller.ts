import { Controller, Post, Body, Inject, Get, Put, Delete, Param, UseGuards, HttpCode, Query } from '@nestjs/common';
import { ICreateTaskUseCase } from 'src/modules/task/application/usecases/create-task.usecase.interface';
import { IDeleteTaskUseCase } from 'src/modules/task/application/usecases/delete-task.usecase.interface';
import { IGetAllTasksUseCase } from 'src/modules/task/application/usecases/get-all-tasks.usecase.interface';
import { IGetTaskByIdUseCase } from 'src/modules/task/application/usecases/get-task-by-id.usecase.interface';
import { IUpdateTaskUseCase } from 'src/modules/task/application/usecases/update-task.usecase.interface';
import { CreateTaskDto } from 'src/modules/task/application/dtos/create-task.dto';
import { UpdateTaskDto } from 'src/modules/task/application/dtos/update-task.dto';
import { TaskFiltersDto } from '../application/dtos/task-filters.dto';
import { Task } from 'src/modules/task/domain/entities/task.entity';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { GetAllTasksResponseDto } from '../application/dtos/get-all-tasks.response.dto';

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
  async create(@Body() request: CreateTaskDto): Promise<Task> {
    var teste = await this.createTaskUseCase.execute(request);
    return teste;
  }

  @Get()
  async getAll(@Query() filters: TaskFiltersDto): Promise<GetAllTasksResponseDto> {
    return await this.getAllTasksUseCase.execute(filters);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Task> {
    return await this.getTaskByIdUseCase.execute(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() request: UpdateTaskDto): Promise<Task> {
    return await this.updateTaskUseCase.execute(id, request);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    return await this.deleteTaskUseCase.execute(id);
  }
}