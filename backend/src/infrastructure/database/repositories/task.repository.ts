import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from '../../../domain/entities/task.entity';
import { ITaskRepository } from '../../../domain/repositories/task.repository';

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(
    @InjectModel('Task') 
    private readonly model: Model<any>,
  ) {}

  async create(task: Task): Promise<Task> {
    const created = await this.model.create({ ...task });
    task.id = created.id;
    return task;
  }
}