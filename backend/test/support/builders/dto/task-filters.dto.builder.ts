import { TaskFiltersDto } from 'src/modules/task/application/dtos/task-filters.dto';

export class TaskFiltersDtoBuilder {
  static build(overrides?: Partial<TaskFiltersDto>): TaskFiltersDto {
    const defaults: TaskFiltersDto = {
      page: 1,
      limit: 10,
      sortBy: 'createdAt',
      sortOrder: 'desc'
    };

    return { ...defaults, ...overrides };
  }
}