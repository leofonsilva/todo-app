import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { User } from 'src/user/domain/entities/user.entity';
import { Task } from 'src/task/domain/entities/task.entity';
import { UserEntityBuilder } from 'test/builders/entities/user.entity.builder';
import { TaskEntityBuilder } from 'test/builders/entities/task.entity.builder';

export class TestDatabaseSeeder {
  constructor(private app: INestApplication) {}

  async seedUser(overrides?: Partial<User>): Promise<User> {
    const { user } = UserEntityBuilder.build(overrides);
    const userModel = this.app.get(getModelToken('User'));
    
    const userData = { ...user };
    
    userModel.findOne.mockResolvedValueOnce(userData);
    await userModel.create(userData);
    
    return user;
  }

  async seedTask(user: User, overrides?: Partial<Task>): Promise<Task> {
    const task = TaskEntityBuilder.build(user, overrides);
    const taskModel = this.app.get(getModelToken('Task'));
    
    const taskData = { ...task };
    
    taskModel.create.mockResolvedValueOnce(taskData);
    await taskModel.create(taskData);
    
    return task;
  }

  async cleanup(): Promise<void> {
    const userModel = this.app.get(getModelToken('User'));
    const taskModel = this.app.get(getModelToken('Task'));
    
    userModel.create.mockClear();
    userModel.findOne.mockClear();
    taskModel.create.mockClear();
  }
}