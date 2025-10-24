import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { TestAppFactory } from 'test/support/setup/test-app.factory';
import { JwtGeneratorHelper } from 'test/support/helpers/jwt-generator.helper';
import { UpdateTaskDtoBuilder } from 'test/support/builders/dto/update-task.dto.builder';
import { UserEntityBuilder } from 'test/support/builders/entities/user.entity.builder';
import { TaskEntityBuilder } from 'test/support/builders/entities/task.entity.builder';
import { TaskRepositoryMock } from 'test/support/mocks/repositories/task-repository.mock';
import { UserRepositoryMock } from 'test/support/mocks/repositories/user-repository.mock';

describe('TaskController - Update', () => {
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

  describe('PUT /tasks/:id', () => {
    describe('Success cases', () => {
      it('should update task successfully with valid JWT', async () => {
        const user = UserEntityBuilder.build().user;
        const existingTaskId = 'task-123';
        const updateData = UpdateTaskDtoBuilder.build();
        const validToken = jwtGeneratorHelper.generateForUser(user);

        const updatedTask = TaskEntityBuilder.build(user, {
          id: existingTaskId,
          ...updateData,
          userId: user.id,
          updatedAt: expect.any(Date)
        });

        userRepositoryMock.findById.mockResolvedValue(user);
        taskRepositoryMock.update.mockResolvedValue(updatedTask);

        const response = await request(app.getHttpServer())
          .put(`/tasks/${existingTaskId}`)
          .set('Authorization', `Bearer ${validToken}`)
          .send(updateData);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(existingTaskId);
        expect(response.body.title).toBe(updateData.title);
        expect(response.body.description).toBe(updateData.description);
        expect(response.body.status).toBe(updateData.status);
        expect(response.body.userId).toBe(user.id);
      });

      it('should update task partially - only title', async () => {
        const user = UserEntityBuilder.build().user;
        const existingTaskId = 'task-123';
        const updateData = UpdateTaskDtoBuilder.build({ 
          description: undefined,
          status: undefined 
        });
        const validToken = jwtGeneratorHelper.generateForUser(user);

        const updatedTask = TaskEntityBuilder.build(user, {
          id: existingTaskId,
          title: updateData.title,
          description: '', // Valor default do usecase quando description é undefined
          status: 'pending', // Valor default do usecase quando status é undefined
          userId: user.id,
          updatedAt: expect.any(Date)
        });

        userRepositoryMock.findById.mockResolvedValue(user);
        taskRepositoryMock.update.mockResolvedValue(updatedTask);

        const response = await request(app.getHttpServer())
          .put(`/tasks/${existingTaskId}`)
          .set('Authorization', `Bearer ${validToken}`)
          .send(updateData);

        expect(response.status).toBe(200);
        expect(response.body.title).toBe(updateData.title);
        expect(response.body.description).toBe(''); // Default do usecase
        expect(response.body.status).toBe('pending'); // Default do usecase
      });

      it('should update task status to done', async () => {
        const user = UserEntityBuilder.build().user;
        const existingTaskId = 'task-123';
        const updateData = UpdateTaskDtoBuilder.build({ status: 'done' });
        const validToken = jwtGeneratorHelper.generateForUser(user);

        const updatedTask = TaskEntityBuilder.build(user, {
          id: existingTaskId,
          status: 'done',
          userId: user.id,
          updatedAt: expect.any(Date)
        });

        userRepositoryMock.findById.mockResolvedValue(user);
        taskRepositoryMock.update.mockResolvedValue(updatedTask);

        const response = await request(app.getHttpServer())
          .put(`/tasks/${existingTaskId}`)
          .set('Authorization', `Bearer ${validToken}`)
          .send(updateData);

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('done');
      });
    });

    describe('Error cases', () => {
      it('should return 401 when JWT token is invalid', async () => {
        const existingTaskId = 'task-123';
        const updateData = UpdateTaskDtoBuilder.build();
        const invalidToken = jwtGeneratorHelper.generateInvalidToken();

        const response = await request(app.getHttpServer())
          .put(`/tasks/${existingTaskId}`)
          .set('Authorization', `Bearer ${invalidToken}`)
          .send(updateData);

        expect(response.status).toBe(401);
      });

      it('should return 401 when JWT token is missing', async () => {
        const existingTaskId = 'task-123';
        const updateData = UpdateTaskDtoBuilder.build();

        const response = await request(app.getHttpServer())
          .put(`/tasks/${existingTaskId}`)
          .send(updateData);

        expect(response.status).toBe(401);
      });

      it('should return 404 when task does not exist', async () => {
        const user = UserEntityBuilder.build().user;
        const nonExistentTaskId = 'non-existent-id';
        const updateData = UpdateTaskDtoBuilder.build();
        const validToken = jwtGeneratorHelper.generateForUser(user);

        userRepositoryMock.findById.mockResolvedValue(user);
        taskRepositoryMock.update.mockResolvedValue(null); // Estoura exceção no usecase quando repositório retorna nulo

        const response = await request(app.getHttpServer())
          .put(`/tasks/${nonExistentTaskId}`)
          .set('Authorization', `Bearer ${validToken}`)
          .send(updateData);

        expect(response.status).toBe(404);
      });

      it('should return 404 when updating task from another user', async () => {
        const user1 = UserEntityBuilder.build().user;
        const user2 = UserEntityBuilder.build().user;
        const taskFromUser1Id = 'task-user1';
        const updateData = UpdateTaskDtoBuilder.build();
        const validTokenUser2 = jwtGeneratorHelper.generateForUser(user2);

        userRepositoryMock.findById.mockResolvedValue(user2);
        taskRepositoryMock.update.mockResolvedValue(null); // Estoura exceção no usecase quando repositório retorna nulo

        const response = await request(app.getHttpServer())
          .put(`/tasks/${taskFromUser1Id}`)
          .set('Authorization', `Bearer ${validTokenUser2}`)
          .send(updateData);

        expect(response.status).toBe(404);
      });

      it('should validate DTO and return 400 for empty title', async () => {
        const user = UserEntityBuilder.build().user;
        const existingTaskId = 'task-123';
        const updateData = UpdateTaskDtoBuilder.build({ title: '' });
        const validToken = jwtGeneratorHelper.generateForUser(user);

        userRepositoryMock.findById.mockResolvedValue(user);

        const response = await request(app.getHttpServer())
          .put(`/tasks/${existingTaskId}`)
          .set('Authorization', `Bearer ${validToken}`)
          .send(updateData);

        expect(response.status).toBe(400);
        expect(response.body.message).toContain('title should not be empty');
      });

      it('should validate DTO and return 400 for invalid status', async () => {
        const user = UserEntityBuilder.build().user;
        const existingTaskId = 'task-123';
        const updateData = UpdateTaskDtoBuilder.build({ 
          status: 'invalid-status' as any 
        });
        const validToken = jwtGeneratorHelper.generateForUser(user);

        userRepositoryMock.findById.mockResolvedValue(user);

        const response = await request(app.getHttpServer())
          .put(`/tasks/${existingTaskId}`)
          .set('Authorization', `Bearer ${validToken}`)
          .send(updateData);

        expect(response.status).toBe(400);
      });
    });
  });
});