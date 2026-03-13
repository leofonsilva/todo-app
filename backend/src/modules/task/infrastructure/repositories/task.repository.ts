import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from 'src/modules/task/domain/entities/task.entity';
import { ITaskRepository } from 'src/modules/task/domain/repositories/task.repository.interface';

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(
    @InjectModel('Task') private readonly model: Model<any>
  ) { }

  async create(task: Task): Promise<Task> {
    const created = await this.model.create({ ...task });
    task.id = created.id;
    return task;
  }

  async findAll(userId: string, query: any = {}, options: any = {}): Promise<Task[]> {
    const baseQuery = { userId, ...query };
    
    return await this.model
      .find(baseQuery)
      .sort(options.sort || { createdAt: -1 })
      .skip(options.skip || 0)
      .limit(options.limit || 10)
      .exec();
  }  

  async findById(id: string, userId: string): Promise<Task | null> {
    return await this.model.findOne({ _id: id, userId }).exec();
  }

  async update(id: string, task: Partial<Task>, userId: string): Promise<Task | null> {
    return await this.model.findOneAndUpdate({ _id: id, userId }, task, { new: true }).exec();
  }

  async delete(id: string, userId: string): Promise<boolean> {
    const response = await this.model.deleteOne({ _id: id, userId }).exec();
    return response.deletedCount > 0;
  }

  async count(userId: string, query: any = {}): Promise<number> {
    const baseQuery = { userId, ...query };
    return await this.model.countDocuments(baseQuery).exec();
  }
}