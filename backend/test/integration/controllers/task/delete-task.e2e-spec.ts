import request from 'supertest';
import { TestAppFactory } from 'test/support/setup/test-app.factory';
import { JwtGeneratorHelper } from 'test/support/helpers/jwt-generator.helper';
import { UserEntityBuilder } from 'test/support/builders/entities/user.entity.builder';
import { INestApplication } from '@nestjs/common';
import { TaskRepositoryMock } from 'test/support/mocks/repositories/task-repository.mock';
import { UserRepositoryMock } from 'test/support/mocks/repositories/user-repository.mock';

describe('TaskController - Delete', () => {
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

  describe('DELETE /tasks/:id', () => {
    describe('Success cases', () => {
      it('should delete task successfully with valid JWT', async () => {
        const user = UserEntityBuilder.build().user;
        const taskId = 'task-123';
        const validToken = jwtGeneratorHelper.generateForUser(user);

        userRepositoryMock.findById.mockResolvedValue(user);
        taskRepositoryMock.delete.mockResolvedValue(true);

        const response = await request(app.getHttpServer())
          .delete(`/tasks/${taskId}`)
          .set('Authorization', `Bearer ${validToken}`);

        expect(response.status).toBe(204);
      });
    });

    describe('Error cases', () => {
      it('should return 401 when JWT token is invalid', async () => {
        const taskId = 'task-123';
        const invalidToken = jwtGeneratorHelper.generateInvalidToken();

        const response = await request(app.getHttpServer())
          .delete(`/tasks/${taskId}`)
          .set('Authorization', `Bearer ${invalidToken}`);

        expect(response.status).toBe(401);
      });

      it('should return 401 when JWT token is missing', async () => {
        const taskId = 'task-123';

        const response = await request(app.getHttpServer())
          .delete(`/tasks/${taskId}`);

        expect(response.status).toBe(401);
      });

      it('should return 404 when task does not exist', async () => {
        const user = UserEntityBuilder.build().user;
        const nonExistentTaskId = 'non-existent-id';
        const validToken = jwtGeneratorHelper.generateForUser(user);

        userRepositoryMock.findById.mockResolvedValue(user);
        taskRepositoryMock.delete.mockResolvedValue(false);

        const response = await request(app.getHttpServer())
          .delete(`/tasks/${nonExistentTaskId}`)
          .set('Authorization', `Bearer ${validToken}`);

        expect(response.status).toBe(404);
      });
    });
  });
});
