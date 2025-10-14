import faker from 'faker';
import { User } from 'src/user/domain/entities/user.entity';

export class UserBuilder {
  static build(overrides?: Partial<User>): { user: User; password: string } {
    const password = overrides?.password || faker.internet.password();
    
    const { 
      id = faker.datatype.uuid(),
      name = faker.name.firstName(),
      email = faker.internet.email(),
      createdAt = new Date('2024-01-01T10:00:00Z')
    } = overrides || {};

    const user = new User(id, name, email, password, createdAt);
    return { user, password };
  }

  // Cenários específicos abaixo
  static buildWithId(id: string): { user: User; password: string } {
    return this.build({ id });
  }

  static buildWithEmail(email: string): { user: User; password: string } {
    return this.build({ email });
  }

  static buildWithoutId(): { user: User; password: string } {
    return this.build({ id: '' });
  }
}