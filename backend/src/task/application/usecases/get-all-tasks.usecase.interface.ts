import { TaskFiltersDto } from '../dtos/task-filters.dto';
import { GetAllTasksResponseDto } from '../dtos/get-all-tasks.response.dto';

export const IGetAllTasksUseCase = Symbol('IGetAllTasksUseCase');

export interface IGetAllTasksUseCase {
  execute(filters?: TaskFiltersDto): Promise<GetAllTasksResponseDto>;
}
