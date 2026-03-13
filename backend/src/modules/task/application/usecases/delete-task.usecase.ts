import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IDeleteTaskUseCase } from './delete-task.usecase.interface';
import { ITaskRepository } from 'src/modules/task/domain/repositories/task.repository.interface';
import { CurrentUserService } from 'src/shared/services/current-user.service';

@Injectable()
export class DeleteTaskUseCase implements IDeleteTaskUseCase {
  constructor(
    @Inject(ITaskRepository) private readonly taskRepository: ITaskRepository,
    private readonly currentUserService: CurrentUserService
  ) { }

  async execute(id: string): Promise<void> {
    const userId = this.currentUserService.getUserId();
    var deleted = await this.taskRepository.delete(id, userId);
    
    if (!deleted) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }
}
