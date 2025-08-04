export const IDeleteTaskUseCase = Symbol('IDeleteTaskUseCase');

export interface IDeleteTaskUseCase {
  execute(id: string, userId: string): Promise<void>;
}
