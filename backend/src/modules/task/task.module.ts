import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TaskSchema } from 'src/modules/task/infrastructure/schemas/task.schema';
import { TaskController } from 'src/modules/task/presentation/task.controller';
import { TaskRepository } from 'src/modules/task/infrastructure/repositories/task.repository';

import { CreateTaskUseCase } from 'src/modules/task/application/usecases/create-task.usecase';
import { DeleteTaskUseCase } from 'src/modules/task/application/usecases/delete-task.usecase';
import { GetAllTasksUseCase } from 'src/modules/task/application/usecases/get-all-tasks.usecase';
import { GetTaskByIdUseCase } from 'src/modules/task/application/usecases/get-task-by-id.usecase';
import { UpdateTaskUseCase } from 'src/modules/task/application/usecases/update-task.usecase';

import { ICreateTaskUseCase } from './application/usecases/create-task.usecase.interface';
import { IDeleteTaskUseCase } from './application/usecases/delete-task.usecase.interface';
import { IGetAllTasksUseCase } from './application/usecases/get-all-tasks.usecase.interface';
import { IGetTaskByIdUseCase } from './application/usecases/get-task-by-id.usecase.interface';
import { IUpdateTaskUseCase } from './application/usecases/update-task.usecase.interface';
import { ITaskRepository } from './domain/repositories/task.repository.interface';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]),
  ],
  controllers: [TaskController],
  providers: [
    TaskRepository,
    { provide: ITaskRepository, useExisting: TaskRepository },

    { provide: ICreateTaskUseCase, useClass: CreateTaskUseCase },
    { provide: IDeleteTaskUseCase, useClass: DeleteTaskUseCase },
    { provide: IGetAllTasksUseCase, useClass: GetAllTasksUseCase },
    { provide: IGetTaskByIdUseCase, useClass: GetTaskByIdUseCase },
    { provide: IUpdateTaskUseCase, useClass: UpdateTaskUseCase },
  ],
  exports: []
})
export class TaskModule { }
