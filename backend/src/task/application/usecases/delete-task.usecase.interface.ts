export const IDeleteTaskUseCase = Symbol('IDeleteTaskUseCase');

export interface IDeleteTaskUseCase {
  execute(id: string): Promise<void>;
}
