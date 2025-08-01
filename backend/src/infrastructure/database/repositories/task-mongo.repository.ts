import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from '../../../domain/entities/task.entity';
import { ITaskRepository } from '../../../domain/repositories/task.repository';

@Injectable()
export class TaskMongoRepository implements ITaskRepository {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<any>,
  ) {}

  async create(task: Task): Promise<Task> {
    const created = await this.taskModel.create(task);
    return new Task(
      created.id,
      created.userId,
      created.title,
      created.description,
      created.status,
      created.createdAt
    );
  }
}