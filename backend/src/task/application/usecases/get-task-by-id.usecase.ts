import { Injectable, Inject } from '@nestjs/common';
import { ITaskRepository } from 'src/task/domain/repositories/task.repository.interface';
import { IGetTaskByIdUseCase } from './get-task-by-id.usecase.interface';
import { Task } from 'src/task/domain/entities/task.entity';
import { CurrentUserService } from 'src/shared/services/current-user.service';

@Injectable()
export class GetTaskByIdUseCase implements IGetTaskByIdUseCase {
  constructor(
    @Inject(ITaskRepository) private readonly taskRepository: ITaskRepository,
    private readonly currentUserService: CurrentUserService
  ) { }

  execute(id: string): Promise<Task | null> {
    const userId = this.currentUserService.getUserId();
    return this.taskRepository.findById(id, userId);
  }
}
