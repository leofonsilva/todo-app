import { Injectable, Inject } from '@nestjs/common';
import { IDeleteTaskUseCase } from './delete-task.usecase.interface';
import { ITaskRepository } from 'src/task/domain/repositories/task.repository.interface';

@Injectable()
export class DeleteTaskUseCase implements IDeleteTaskUseCase {
  constructor(
    @Inject(ITaskRepository) private readonly taskRepository: ITaskRepository
  ) { }

  async execute(id: string, userId: string): Promise<void> {
    await this.taskRepository.delete(id, userId);
  }
}
