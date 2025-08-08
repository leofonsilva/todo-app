import { Injectable, Inject } from '@nestjs/common';
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

  async execute(id: string, data: UpdateTaskDto): Promise<Task> {
    const userId = this.currentUserService.getUserId();
    return this.taskRepository.update(id, data, userId);
  }
}
