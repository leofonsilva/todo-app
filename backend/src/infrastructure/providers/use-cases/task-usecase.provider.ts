import { ICreateTaskUseCase } from 'src/application/use-cases/task/interfaces/create-task.usecase';
import { CreateTaskUseCase } from 'src/application/use-cases/task/create-task.usecase';
import { IGetTaskByIdUseCase } from 'src/application/use-cases/task/interfaces/get-task-by-id.usecase';
import { IGetAllTasksUseCase } from 'src/application/use-cases/task/interfaces/get-all-tasks.usecase';
import { GetAllTasksUseCase } from 'src/application/use-cases/task/get-all-tasks.usecase';
import { GetTaskByIdUseCase } from 'src/application/use-cases/task/get-task-by-id.usecase';
import { IUpdateTaskUseCase } from 'src/application/use-cases/task/interfaces/update-task.usecase';
import { UpdateTaskUseCase } from 'src/application/use-cases/task/update-task.usecase';
import { IDeleteTaskUseCase } from 'src/application/use-cases/task/interfaces/delete-task.usecase';
import { DeleteTaskUseCase } from 'src/application/use-cases/task/delete-task.usecase';

export const TaskUseCaseProviders = [
  { provide: ICreateTaskUseCase, useClass: CreateTaskUseCase },
  { provide: IGetAllTasksUseCase, useClass: GetAllTasksUseCase },
  { provide: IGetTaskByIdUseCase, useClass: GetTaskByIdUseCase },
  { provide: IUpdateTaskUseCase, useClass: UpdateTaskUseCase },
  { provide: IDeleteTaskUseCase, useClass: DeleteTaskUseCase },
];