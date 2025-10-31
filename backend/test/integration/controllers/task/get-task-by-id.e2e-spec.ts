import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { TestAppFactory } from 'test/support/setup/test-app.factory';
import { JwtGeneratorHelper } from 'test/support/helpers/jwt-generator.helper';
import { UserEntityBuilder } from 'test/support/builders/entities/user.entity.builder';
import { TaskEntityBuilder } from 'test/support/builders/entities/task.entity.builder';
import { TaskRepositoryMock } from 'test/support/mocks/repositories/task-repository.mock';
import { UserRepositoryMock } from 'test/support/mocks/repositories/user-repository.mock';

describe('TaskController - GetById', () => {
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

  describe('GET /tasks/:id', () => {
    describe('Success cases', () => {
      it('should get task successfully by id with valid JWT', async () => {
        const user = UserEntityBuilder.build().user;
        const taskId = 'task-123';
        const expectedTask = TaskEntityBuilder.build(user, { id: taskId });
        const validToken = jwtGeneratorHelper.generateForUser(user);

        userRepositoryMock.findById.mockResolvedValue(user);
        taskRepositoryMock.findById.mockResolvedValue(expectedTask);

        const response = await request(app.getHttpServer())
          .get(`/tasks/${taskId}`)
          .set('Authorization', `Bearer ${validToken}`);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(taskId);
        expect(response.body.title).toBe(expectedTask.title);
        expect(response.body.description).toBe(expectedTask.description);
        expect(response.body.status).toBe(expectedTask.status);
        expect(response.body.userId).toBe(user.id);
      });
    });

    describe('Error cases', () => {
      it('should return 401 when JWT token is invalid', async () => {
        const taskId = 'task-123';
        const invalidToken = jwtGeneratorHelper.generateInvalidToken();

        const response = await request(app.getHttpServer())
          .get(`/tasks/${taskId}`)
          .set('Authorization', `Bearer ${invalidToken}`);

        expect(response.status).toBe(401);
      });

      it('should return 401 when JWT token is missing', async () => {
        const taskId = 'task-123';

        const response = await request(app.getHttpServer())
          .get(`/tasks/${taskId}`);

        expect(response.status).toBe(401);
      });

      it('should return 404 when task does not exist', async () => {
        const user = UserEntityBuilder.build().user;
        const nonExistentTaskId = 'non-existent-id';
        const validToken = jwtGeneratorHelper.generateForUser(user);

        userRepositoryMock.findById.mockResolvedValue(user);
        taskRepositoryMock.findById.mockResolvedValue(null);

        const response = await request(app.getHttpServer())
          .get(`/tasks/${nonExistentTaskId}`)
          .set('Authorization', `Bearer ${validToken}`);

        expect(response.status).toBe(404);
      });

      it('should return 404 when getting task from another user', async () => {
        const user1 = UserEntityBuilder.build().user;
        const user2 = UserEntityBuilder.build().user;
        const taskFromUser1Id = 'task-user1';
        const validTokenUser2 = jwtGeneratorHelper.generateForUser(user2);

        userRepositoryMock.findById.mockResolvedValue(user2);
        taskRepositoryMock.findById.mockResolvedValue(null);

        const response = await request(app.getHttpServer())
          .get(`/tasks/${taskFromUser1Id}`)
          .set('Authorization', `Bearer ${validTokenUser2}`);

        expect(response.status).toBe(404);
      });
    });
  });
});
