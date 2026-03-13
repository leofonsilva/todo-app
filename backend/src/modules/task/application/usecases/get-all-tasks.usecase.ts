import { Injectable, Inject } from '@nestjs/common';
import { ITaskRepository } from 'src/modules/task/domain/repositories/task.repository.interface';
import { IGetAllTasksUseCase } from './get-all-tasks.usecase.interface';
import { CurrentUserService } from 'src/shared/services/current-user.service';
import { TaskFiltersDto } from '../dtos/task-filters.dto';
import { GetAllTasksResponseDto } from '../dtos/get-all-tasks.response.dto';

@Injectable()
export class GetAllTasksUseCase implements IGetAllTasksUseCase {
  constructor(
    @Inject(ITaskRepository) private readonly taskRepository: ITaskRepository,
    private readonly currentUserService: CurrentUserService
  ) { }

  async execute(filters?: TaskFiltersDto): Promise<GetAllTasksResponseDto> {
    const userId = this.currentUserService.getUserId();
    const { query, options } = this.buildQueryAndOptions(filters);

    const [tasks, total] = await Promise.all([
      this.taskRepository.findAll(userId, query, options),
      this.taskRepository.count(userId, query)
    ]);

    const totalPages = Math.ceil(total / options.limit);

    return {
      tasks: tasks,
      pagination: {
        total,
        page: options.page,
        limit: options.limit,
        totalPages
      }
    };
  }

  private buildQueryAndOptions(filters?: TaskFiltersDto): {
    query: any;
    options: any
  } {
    const defaultOptions = {
      page: 1,
      limit: 10,
      sortBy: 'createdAt',
      sortOrder: 'desc' as const
    };

    const mergedFilters = { ...defaultOptions, ...filters };

    const query: any = {};

    if (mergedFilters.status) {
      query.status = mergedFilters.status;
    }

    if (mergedFilters.isCompleted !== undefined) {
      query.status = mergedFilters.isCompleted ? 'done' : { $in: ['pending', 'in-progress'] };
    }

    if (mergedFilters.search) {
      query.$or = [
        { title: { $regex: mergedFilters.search, $options: 'i' } },
        { description: { $regex: mergedFilters.search, $options: 'i' } }
      ];
    }

    const maxLimit = 100;
    const safeLimit = Math.min(mergedFilters.limit, maxLimit);

    const options = {
      page: mergedFilters.page,
      limit: mergedFilters.limit,
      skip: (mergedFilters.page - 1) * safeLimit,
      sort: {
        [mergedFilters.sortBy]: mergedFilters.sortOrder === 'desc' ? -1 : 1
      }
    };

    return { query, options };
  }
}
