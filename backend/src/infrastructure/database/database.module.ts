import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TaskSchema } from './schemas/task.schema';
import { UserSchema } from './schemas/user.schema';

import { TaskRepository } from './repositories/task.repository';
import { UserRepository } from './repositories/user.repository';

import { ITaskRepository } from 'src/domain/repositories/task.repository';
import { IUserRepository } from 'src/domain/repositories/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Task', schema: TaskSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  providers: [
    { provide: ITaskRepository, useClass: TaskRepository },
    { provide: IUserRepository, useClass: UserRepository },
  ],
  exports: [
    ITaskRepository,
    IUserRepository,
  ],
})
export class DatabaseModule {}
