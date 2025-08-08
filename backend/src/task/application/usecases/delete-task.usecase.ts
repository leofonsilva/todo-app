import { Injectable, Inject } from '@nestjs/common';
import { IDeleteTaskUseCase } from './delete-task.usecase.interface';
import { ITaskRepository } from 'src/task/domain/repositories/task.repository.interface';
import { CurrentUserService } from 'src/shared/services/current-user.service';

@Injectable()
export class DeleteTaskUseCase implements IDeleteTaskUseCase {
  constructor(
    @Inject(ITaskRepository) private readonly taskRepository: ITaskRepository,
    private readonly currentUserService: CurrentUserService
  ) { }

  async execute(id: string): Promise<void> {
    const userId = this.currentUserService.getUserId();
    await this.taskRepository.delete(id, userId);
  }
}
