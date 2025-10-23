import faker from 'faker';
import { UpdateTaskDto } from 'src/task/application/dtos/update-task.dto';

export class UpdateTaskDtoBuilder {
  static build(overrides?: Partial<UpdateTaskDto>): UpdateTaskDto {
    const defaultRequest = {
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      status: 'pending' as 'pending' | 'in-progress' | 'done',
    };

    return { ...defaultRequest, ...overrides };
  }
}