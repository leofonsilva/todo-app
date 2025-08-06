import { Injectable, Inject } from '@nestjs/common';
import { IDeleteTaskUseCase } from './interfaces/delete-task.usecase';
import { ITaskRepository } from 'src/domain/repositories/task.repository';

@Injectable()
export class DeleteTaskUseCase implements IDeleteTaskUseCase {
  constructor(
    @Inject(ITaskRepository) private readonly taskRepository: ITaskRepository
  ) { }

  async execute(id: string, userId: string): Promise<void> {
    await this.taskRepository.delete(id, userId);
  }
}
