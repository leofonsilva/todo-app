import { Task } from '../entities/task.entity';

export const ITaskRepository = Symbol('ITaskRepository');

export interface ITaskRepository {
  create(task: Task): Promise<Task>;
  findAll(userId: string): Promise<Task[]>;
  findById(id: string, userId: string): Promise<Task | null>;
  update(id: string, task: Partial<Task>, userId: string): Promise<Task>;
  delete(id: string, userId: string): Promise<void>;
}