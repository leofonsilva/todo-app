import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from './presentation/controllers/task.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UseCaseProviders } from './infrastructure/providers/usecase.provider';
import { DatabaseModule } from './infrastructure/database/database.module';
import { UserController } from './presentation/controllers/user.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/todo'),
    DatabaseModule
  ],
  controllers: [
    AppController,
    TaskController,
    UserController
  ],
  providers: [
    AppService,
    ...UseCaseProviders,
  ],
})

export class AppModule { }
