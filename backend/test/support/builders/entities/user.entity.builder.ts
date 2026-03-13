import { faker } from '@faker-js/faker';
import { User } from 'src/modules/user/domain/entities/user.entity';

export class UserEntityBuilder {
  static build(overrides?: Partial<User>): { user: User; password: string } {
    const password = overrides?.password || faker.internet.password();
    
    const { 
      id = faker.string.uuid(),
      name = faker.person.firstName(),
      email = faker.internet.email(),
      createdAt = new Date('2024-01-01T10:00:00Z')
    } = overrides || {};

    const user = new User(id, name, email, password, createdAt);
    return { user, password };
  }
}
