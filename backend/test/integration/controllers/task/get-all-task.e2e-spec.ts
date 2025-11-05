import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { TestAppFactory } from 'test/support/setup/test-app.factory';
import { JwtGeneratorHelper } from 'test/support/helpers/jwt-generator.helper';
import { UserEntityBuilder } from 'test/support/builders/entities/user.entity.builder';
import { TaskEntityBuilder } from 'test/support/builders/entities/task.entity.builder';
import { TaskRepositoryMock } from 'test/support/mocks/repositories/task-repository.mock';
import { UserRepositoryMock } from 'test/support/mocks/repositories/user-repository.mock';

describe('TaskController - GetAll', () => {
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

  describe('GET /tasks', () => {
    describe('Success cases', () => {
      it('should get all tasks with pagination structure', async () => {
        const user = UserEntityBuilder.build().user;
        const tasks = TaskEntityBuilder.buildCollection(user, 2);
        const validToken = jwtGeneratorHelper.generateForUser(user);

        userRepositoryMock.findById.mockResolvedValue(user);
        taskRepositoryMock.findAll.mockResolvedValue(tasks);
        taskRepositoryMock.count.mockResolvedValue(15);

        const response = await request(app.getHttpServer())
          .get('/tasks')
          .set('Authorization', `Bearer ${validToken}`);

        expect(response.status).toBe(200);
        expect(response.body.tasks).toHaveLength(2);
        expect(response.body.tasks[0].id).toBe('task-1');
        expect(response.body.tasks[1].id).toBe('task-2');
        expect(response.body.pagination).toEqual({
          total: 15,
          page: 1,
          limit: 10,
          totalPages: 2
        });
      });

      it('should apply filters when provided', async () => {
        const user = UserEntityBuilder.build().user;
        const tasks = TaskEntityBuilder.buildCollection(user, 1, { status: 'done' });
        const validToken = jwtGeneratorHelper.generateForUser(user);

        userRepositoryMock.findById.mockResolvedValue(user);
        taskRepositoryMock.findAll.mockResolvedValue(tasks);
        taskRepositoryMock.count.mockResolvedValue(1);

        const response = await request(app.getHttpServer())
          .get('/tasks')
          .query({ status: 'done', search: 'important' })
          .set('Authorization', `Bearer ${validToken}`);

        expect(response.status).toBe(200);
        expect(response.body.tasks[0].status).toBe('done');
      });

      it('should handle pagination with multiple pages', async () => {
        const user = UserEntityBuilder.build().user;
        const tasks = TaskEntityBuilder.buildCollection(user, 5);
        const validToken = jwtGeneratorHelper.generateForUser(user);

        userRepositoryMock.findById.mockResolvedValue(user);
        taskRepositoryMock.findAll.mockResolvedValue(tasks);
        taskRepositoryMock.count.mockResolvedValue(25);

        const response = await request(app.getHttpServer())
          .get('/tasks')
          .query({ page: 2, limit: 5 })
          .set('Authorization', `Bearer ${validToken}`);

        expect(response.status).toBe(200);
        expect(response.body.tasks).toHaveLength(5);
        expect(response.body.pagination.total).toBe(25);
        expect(response.body.pagination.totalPages).toBe(5);
      });
    });

    describe('Error cases', () => {
      it('should return 401 when not authenticated', async () => {
        const response = await request(app.getHttpServer()).get('/tasks');
        expect(response.status).toBe(401);
      });

      it('should validate invalid status', async () => {
        const user = UserEntityBuilder.build().user;
        const validToken = jwtGeneratorHelper.generateForUser(user);

        userRepositoryMock.findById.mockResolvedValue(user);

        const response = await request(app.getHttpServer())
          .get('/tasks')
          .query({ status: 'invalid' })
          .set('Authorization', `Bearer ${validToken}`);

        expect(response.status).toBe(400);
        expect(response.body.message).toContain('status must be one of the following values');
      });

      it('should validate invalid page number', async () => {
        const user = UserEntityBuilder.build().user;
        const validToken = jwtGeneratorHelper.generateForUser(user);

        userRepositoryMock.findById.mockResolvedValue(user);

        const response = await request(app.getHttpServer())
          .get('/tasks')
          .query({ page: 0 })
          .set('Authorization', `Bearer ${validToken}`);

        expect(response.status).toBe(400);
        expect(response.body.message).toContain('page must not be less than 1');
      });
    });
  });
});
