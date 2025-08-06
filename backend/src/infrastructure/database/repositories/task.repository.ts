import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from 'src/domain/entities/task.entity';
import { ITaskRepository } from 'src/domain/repositories/task.repository';

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(
    @InjectModel('Task') private readonly model: Model<any>,
  ) { }

  async create(task: Task): Promise<Task> {
    const created = await this.model.create({ ...task });
    task.id = created.id;
    return task;
  }

  findAll(userId: string): Promise<Task[]> {
    return this.model.find({ userId }).exec();
  }

  findById(id: string, userId: string): Promise<Task | null> {
    return this.model.findOne({ _id: id, userId }).exec();
  }

  update(id: string, task: Partial<Task>, userId: string): Promise<Task> {
    return this.model.findOneAndUpdate({ _id: id, userId }, task, { new: true }).exec();
  }

  async delete(id: string, userId: string): Promise<void> {
    await this.model.deleteOne({ _id: id, userId }).exec();
  }
}