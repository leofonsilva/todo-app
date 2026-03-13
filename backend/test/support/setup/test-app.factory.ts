import { Test } from '@nestjs/testing';
import { INestApplication, Logger } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { getConnectionToken } from '@nestjs/mongoose';

import { IUserRepository } from 'src/modules/user/domain/repositories/user.repository.interface';
import { UserRepository } from 'src/modules/user/infrastructure/repositories/user.repository';
import { TaskRepository } from 'src/modules/task/infrastructure/repositories/task.repository';
import { ITaskRepository } from 'src/modules/task/domain/repositories/task.repository.interface';

import { TaskRepositoryMock } from 'test/support/mocks/repositories/task-repository.mock';
import { UserRepositoryMock } from 'test/support/mocks/repositories/user-repository.mock';

export class TestAppFactory {
  private app: INestApplication;
  private mockTaskRepository = new TaskRepositoryMock();
  private mockUserRepository = new UserRepositoryMock();

  async initialize(): Promise<INestApplication> {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      // Mock da conexão do Mongoose
      .overrideProvider(getConnectionToken())
      .useValue(this.createMongooseConnectionMock())

      // Mock dos repositórios
      .overrideProvider(TaskRepository)
      .useValue(this.mockTaskRepository)
      .overrideProvider(ITaskRepository)
      .useValue(this.mockTaskRepository)

      .overrideProvider(UserRepository)
      .useValue(this.mockUserRepository)
      .overrideProvider(IUserRepository)
      .useValue(this.mockUserRepository)

      // Compilação
      .compile();

    this.app = moduleRef.createNestApplication();
    this.setupLoggerMocks();
    await this.app.init();
    return this.app;
  }

  private createMongooseConnectionMock() {
    const mockConnection = {
      readyState: 1,
      models: {},
      model: jest.fn(),
      close: jest.fn().mockResolvedValue(undefined),
      startSession: jest.fn().mockResolvedValue({
        endSession: jest.fn(),
        abortTransaction: jest.fn(),
        commitTransaction: jest.fn(),
        startTransaction: jest.fn(),
      }),
      db: { databaseName: 'test', close: jest.fn().mockResolvedValue(undefined) },
    };

    (mockConnection as any).$initialConnection = Promise.resolve(mockConnection);
    return mockConnection;
  }

  private setupLoggerMocks() {
    jest.spyOn(Logger.prototype, 'error').mockImplementation((error) => {
      if (error?.statusCode && error.statusCode < 500) return;
      console.error(error);
    });
  }

  getTaskRepository(): TaskRepositoryMock {
    return this.mockTaskRepository;
  }

  getUserRepository(): UserRepositoryMock {
    return this.mockUserRepository;
  }

  async cleanup(): Promise<void> {
    if (this.app) {
      await this.app.close();
    }
  }

  getHttpServer() {
    return this.app.getHttpServer();
  }
}
