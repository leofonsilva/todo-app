import { Injectable, Inject } from '@nestjs/common';
import { ITaskRepository } from 'src/task/domain/repositories/task.repository.interface';
import { Task } from 'src/task/domain/entities/task.entity';
import { IGetAllTasksUseCase } from './get-all-tasks.usecase.interface';
import { CurrentUserService } from 'src/shared/services/current-user.service';

@Injectable()
export class GetAllTasksUseCase implements IGetAllTasksUseCase {
  constructor(
    @Inject(ITaskRepository) private readonly taskRepository: ITaskRepository,
    private readonly currentUserService: CurrentUserService
  ) { }

  async execute(): Promise<Task[]> {
    const userId = this.currentUserService.getUserId();
    return await this.taskRepository.findAll(userId);
  }
}
