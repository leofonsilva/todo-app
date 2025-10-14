import faker from 'faker';
import { CreateTaskDto } from 'src/task/application/dtos/create-task.dto';

export class CreateTaskRequestBuilder {
  static build(overrides?: Partial<CreateTaskDto>): CreateTaskDto {
    const defaultRequest = {
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(),
    };

    return { ...defaultRequest, ...overrides };
  }

  // Cenários específicos abaixo
  static buildEmptyTitle(): CreateTaskDto {
    return this.build({ title: '' });
  }

  static buildWithLongTitle(): CreateTaskDto {
    return this.build({ 
      title: faker.lorem.words(50)
    });
  }

  static buildWithoutDescription(): CreateTaskDto {
    return this.build({ description: undefined });
  }

  static buildWithEmptyDescription(): CreateTaskDto {
    return this.build({ description: '' });
  }

  static buildMinimal(): CreateTaskDto {
    return this.build({ 
      title: 'Task',
      description: undefined 
    });
  }
}