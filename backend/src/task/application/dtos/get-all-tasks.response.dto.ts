import { PaginationResponseDto } from "src/shared/dtos/pagination.response.dto";
import { Task } from "src/task/domain/entities/task.entity";

export class GetAllTasksResponseDto {
  tasks: Task[];
  pagination: PaginationResponseDto;
}
