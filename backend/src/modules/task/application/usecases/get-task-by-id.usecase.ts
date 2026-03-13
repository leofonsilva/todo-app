import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ITaskRepository } from 'src/modules/task/domain/repositories/task.repository.interface';
import { IGetTaskByIdUseCase } from './get-task-by-id.usecase.interface';
import { Task } from 'src/modules/task/domain/entities/task.entity';
import { CurrentUserService } from 'src/shared/services/current-user.service';

@Injectable()
export class GetTaskByIdUseCase implements IGetTaskByIdUseCase {
  constructor(
    @Inject(ITaskRepository) private readonly taskRepository: ITaskRepository,
    private readonly currentUserService: CurrentUserService
  ) { }

  async execute(id: string): Promise<Task> {
    const userId = this.currentUserService.getUserId();
    const task = await this.taskRepository.findById(id, userId);

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return task;
  }
}
