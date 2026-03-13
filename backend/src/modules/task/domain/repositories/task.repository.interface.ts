import { Task } from '../entities/task.entity';

export const ITaskRepository = Symbol('ITaskRepository');

export interface ITaskRepository {
  create(task: Task): Promise<Task>;
  findAll(userId: string, query?: any, options?: any): Promise<Task[]>;
  findById(id: string, userId: string): Promise<Task | null>;
  update(id: string, task: Partial<Task>, userId: string): Promise<Task | null>;
  delete(id: string, userId: string): Promise<boolean>;
  count(userId: string, query?: any): Promise<number>;
}