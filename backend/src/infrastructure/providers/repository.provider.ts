import { ITaskRepository } from '../../domain/repositories/task.repository';
import { TaskRepository } from '../database/repositories/task.repository';

export const RepositoryProviders = [
  {
    provide: ITaskRepository,
    useClass: TaskRepository,
  },
];