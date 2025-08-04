import { ICreateTaskUseCase } from '../../application/use-cases/task/interfaces/create-task.usecase';
import { CreateTaskUseCase } from '../../application/use-cases/task/create-task.usecase';
import { IGetTaskByIdUseCase } from '../../application/use-cases/task/interfaces/get-task-by-id.usecase';
import { IGetAllTasksUseCase } from '../../application/use-cases/task/interfaces/get-all-tasks.usecase';
import { GetAllTasksUseCase } from '../../application/use-cases/task/get-all-tasks.usecase';
import { GetTaskByIdUseCase } from '../../application/use-cases/task/get-task-by-id.usecase';
import { IUpdateTaskUseCase } from '../../application/use-cases/task/interfaces/update-task.usecase';
import { UpdateTaskUseCase } from '../../application/use-cases/task/update-task.usecase';
import { IDeleteTaskUseCase } from '../../application/use-cases/task/interfaces/delete-task.usecase';
import { DeleteTaskUseCase } from '../../application/use-cases/task/delete-task.usecase';

export const UseCaseProviders = [
  { provide: ICreateTaskUseCase, useClass: CreateTaskUseCase },
  { provide: IGetAllTasksUseCase, useClass: GetAllTasksUseCase },
  { provide: IGetTaskByIdUseCase, useClass: GetTaskByIdUseCase },
  { provide: IUpdateTaskUseCase, useClass: UpdateTaskUseCase },
  { provide: IDeleteTaskUseCase, useClass: DeleteTaskUseCase },
];