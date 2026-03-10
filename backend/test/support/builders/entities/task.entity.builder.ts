import { faker } from '@faker-js/faker';
import { Task } from 'src/task/domain/entities/task.entity';
import { User } from 'src/user/domain/entities/user.entity';

export class TaskEntityBuilder {
  static build(user: User, overrides?: Partial<Task>): Task {
    const {
      id = faker.string.uuid(),
      title = faker.lorem.words(3),
      description = faker.lorem.sentence(),
      status = 'pending' as const,
      createdAt = new Date('2024-01-01T10:00:00Z'),
      updatedAt = new Date('2024-01-01T10:00:00Z')
    } = overrides || {};

    return new Task(id, user.id, title, description, status, createdAt, updatedAt);
  }

  static buildCollection(user: User, count: number = 2, overrides?: Partial<Task>): Task[] {
    return Array.from({ length: count }, (_, index) =>
      this.build(user, {
        id: `task-${index + 1}`,
        ...overrides
      })
    );
  }
}
