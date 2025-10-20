import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { getModelToken } from '@nestjs/mongoose';

export class TestAppFactory {
  private app: INestApplication;

  async initialize(): Promise<INestApplication> {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getModelToken('User'))
      .useValue({
        create: jest.fn().mockImplementation((dto) => ({
          id: dto.id || `user-${Date.now()}`,
          ...dto,
          save: jest.fn().mockResolvedValue({ 
            id: dto.id || `user-${Date.now()}`, 
            ...dto 
          })
        })),
        findOne: jest.fn().mockResolvedValue(null),
        find: jest.fn().mockResolvedValue([]),
        deleteMany: jest.fn().mockResolvedValue({ deletedCount: 0 }),
      })
      .overrideProvider(getModelToken('Task'))
      .useValue({
        create: jest.fn().mockImplementation((dto) => ({
          id: dto.id || `task-${Date.now()}`,
          ...dto,
          save: jest.fn().mockResolvedValue({ 
            id: dto.id || `task-${Date.now()}`, 
            ...dto 
          })
        })),
        findOne: jest.fn().mockResolvedValue(null),
        find: jest.fn().mockResolvedValue([]),
        deleteMany: jest.fn().mockResolvedValue({ deletedCount: 0 }),
      })
      .compile();

    this.app = moduleRef.createNestApplication();
    await this.app.init();
    return this.app;
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
