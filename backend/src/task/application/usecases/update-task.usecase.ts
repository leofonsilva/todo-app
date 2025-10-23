import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IUpdateTaskUseCase } from './update-task.usecase.interface';
import { ITaskRepository } from 'src/task/domain/repositories/task.repository.interface';
import { Task } from 'src/task/domain/entities/task.entity';
import { UpdateTaskDto } from 'src/task/application/dtos/update-task.dto';
import { CurrentUserService } from 'src/shared/services/current-user.service';

@Injectable()
export class UpdateTaskUseCase implements IUpdateTaskUseCase {
  constructor(
    @Inject(ITaskRepository) private readonly taskRepository: ITaskRepository,
    private readonly currentUserService: CurrentUserService
  ) { }

  async execute(id: string, request: UpdateTaskDto): Promise<Task> {
    const userId = this.currentUserService.getUserId();

    const partialTask: Partial<Task> = {
      title: request.title,
      description: request.description ?? '',
      status: request.status ?? 'pending',
      userId,
      updatedAt: new Date()
    };

    const task = await this.taskRepository.update(id, partialTask, userId);

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return task;
  }
}
