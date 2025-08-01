import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from './presentation/controllers/task.controller';
import { TaskSchema } from './infrastructure/database/schemas/task.schema';
import { TaskMongoRepository } from './infrastructure/database/repositories/task-mongo.repository';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/todo'),
    MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]),
  ],
  controllers: [
    AppController, 
    TaskController
  ],
  providers: [
    AppService, 
    TaskMongoRepository
  ],
})
export class AppModule {}
