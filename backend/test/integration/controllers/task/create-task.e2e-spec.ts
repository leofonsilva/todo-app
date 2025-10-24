import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { TestAppFactory } from 'test/support/setup/test-app.factory';
import { JwtGeneratorHelper } from 'test/support/helpers/jwt-generator.helper';
import { CreateTaskDtoBuilder } from 'test/support/builders/dto/create-task.dto.builder';
import { UserEntityBuilder } from 'test/support/builders/entities/user.entity.builder';
import { TaskEntityBuilder } from 'test/support/builders/entities/task.entity.builder';
import { TaskRepositoryMock } from 'test/support/mocks/repositories/task-repository.mock';
import { UserRepositoryMock } from 'test/support/mocks/repositories/user-repository.mock';

describe('TaskController - Create', () => {
  let testAppFactory: TestAppFactory;
  let app: INestApplication;
  let jwtGeneratorHelper: JwtGeneratorHelper;
  let taskRepositoryMock: TaskRepositoryMock;
  let userRepositoryMock: UserRepositoryMock;

  beforeAll(async () => {
    testAppFactory = new TestAppFactory();
    app = await testAppFactory.initialize();
    
    taskRepositoryMock = testAppFactory.getTaskRepository();
    userRepositoryMock = testAppFactory.getUserRepository();
    
    jwtGeneratorHelper = new JwtGeneratorHelper();
  });

  beforeEach(() => {
    taskRepositoryMock.clearMocks();
    userRepositoryMock.clearMocks();
  });

  afterAll(async () => {
    await testAppFactory.cleanup();
  });

  describe('POST /tasks', () => {
    describe('Success cases', () => {
      it('should create task successfully with valid JWT', async () => {
        const user = UserEntityBuilder.build().user;
        const requestBody = CreateTaskDtoBuilder.build();
        const validToken = jwtGeneratorHelper.generateForUser(user);

        const expectedTask = TaskEntityBuilder.build(user, {
          title: requestBody.title,
          description: requestBody.description,
          status: 'pending'
        });

        userRepositoryMock.findById.mockResolvedValue(user);
        taskRepositoryMock.create.mockResolvedValue(expectedTask);

        const response = await request(app.getHttpServer())
          .post('/tasks')
          .set('Authorization', `Bearer ${validToken}`)
          .send(requestBody);

        expect(response.status).toBe(201);
        expect(response.body.id).toBe(expectedTask.id);
        expect(response.body.title).toBe(requestBody.title);
        expect(response.body.userId).toBe(user.id);
        expect(response.body.status).toBe('pending');
      });

      it('should create task without description', async () => {
        const user = UserEntityBuilder.build().user;
        const requestBody = CreateTaskDtoBuilder.build({ description: undefined });
        const validToken = jwtGeneratorHelper.generateForUser(user);

        const expectedTask = TaskEntityBuilder.build(user, {
          title: requestBody.title,
          description: '', // Valor default do use case
          status: 'pending'
        });

        userRepositoryMock.findById.mockResolvedValue(user);
        taskRepositoryMock.create.mockResolvedValue(expectedTask);

        const response = await request(app.getHttpServer())
          .post('/tasks')
          .set('Authorization', `Bearer ${validToken}`)
          .send(requestBody);

        expect(response.status).toBe(201);
        expect(response.body.description).toBe('');
      });
    });

    describe('Error cases', () => {
      it('should return 401 when JWT token is invalid', async () => {
        const requestBody = CreateTaskDtoBuilder.build();
        const invalidToken = jwtGeneratorHelper.generateInvalidToken();

        const response = await request(app.getHttpServer())
          .post('/tasks')
          .set('Authorization', `Bearer ${invalidToken}`)
          .send(requestBody);

        expect(response.status).toBe(401);
      });

      it('should return 401 when JWT token is missing', async () => {
        const requestBody = CreateTaskDtoBuilder.build();

        const response = await request(app.getHttpServer())
          .post('/tasks')
          .send(requestBody);

        expect(response.status).toBe(401);
      });

      it('should validate DTO and return 400 for empty title', async () => {
        const user = UserEntityBuilder.build().user;
        const requestBody = CreateTaskDtoBuilder.build({ title: '' });
        const validToken = jwtGeneratorHelper.generateForUser(user);

        userRepositoryMock.findById.mockResolvedValue(user);

        const response = await request(app.getHttpServer())
          .post('/tasks')
          .set('Authorization', `Bearer ${validToken}`)
          .send(requestBody);

        expect(response.status).toBe(400);
        expect(response.body.message).toContain('title should not be empty');
      });
    });
  });
});
