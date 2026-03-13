import { faker } from '@faker-js/faker';
import { CreateTaskDto } from 'src/modules/task/application/dtos/create-task.dto';

export class CreateTaskDtoBuilder {
  static build(overrides?: Partial<CreateTaskDto>): CreateTaskDto {
    const defaultRequest = {
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(),
    };

    return { ...defaultRequest, ...overrides };
  }
}
