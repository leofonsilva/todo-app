import request from 'supertest';
import { TestAppFactory } from 'test/support/setup/test-app.factory';
import { TestDatabaseSeeder } from 'test/support/setup/test-database.seeder';
import { TestJwtGenerator } from 'test/support/auth/test-jwt.generator';
import { CreateTaskDtoBuilder } from 'test/builders/dto/create-task.dto.builder';

describe('TaskController - Create', () => {
  let testAppFactory: TestAppFactory;
  let databaseSeeder: TestDatabaseSeeder;
  let jwtGenerator: TestJwtGenerator;
  let app: any;

  beforeAll(async () => {
    testAppFactory = new TestAppFactory();
    app = await testAppFactory.initialize();
    databaseSeeder = new TestDatabaseSeeder(app);
    jwtGenerator = new TestJwtGenerator();
  }, 30000);

  beforeEach(async () => {
    await databaseSeeder.cleanup();
  });

  afterAll(async () => {
    await testAppFactory.cleanup();
  });

  describe('POST /tasks', () => {
    describe('Success cases', () => {
      it('should create task successfully with valid JWT', async () => {
        const user = await databaseSeeder.seedUser();
        const requestBody = CreateTaskDtoBuilder.build();
        const validToken = jwtGenerator.generateForUser(user);

        const response = await request(app.getHttpServer())
          .post('/tasks')
          .set('Authorization', `Bearer ${validToken}`)
          .send(requestBody);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe(requestBody.title);
        expect(response.body.userId).toBe(user.id);
        expect(response.body.status).toBe('pending');
      });

      it('should create task without description', async () => {
        const user = await databaseSeeder.seedUser();
        const requestBody = CreateTaskDtoBuilder.build({ description: undefined });
        const validToken = jwtGenerator.generateForUser(user);

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
        const invalidToken = jwtGenerator.generateInvalidToken();

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
        const user = await databaseSeeder.seedUser();
        const requestBody = CreateTaskDtoBuilder.build({ title: '' });
        const validToken = jwtGenerator.generateForUser(user);

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
