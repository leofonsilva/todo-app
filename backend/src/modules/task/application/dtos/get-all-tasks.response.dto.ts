import { PaginationResponseDto } from "src/shared/dtos/pagination.response.dto";
import { Task } from "src/modules/task/domain/entities/task.entity";

export class GetAllTasksResponseDto {
  tasks: Task[];
  pagination: PaginationResponseDto;
}
