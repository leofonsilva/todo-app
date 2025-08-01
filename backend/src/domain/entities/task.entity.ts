export class Task {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly title: string,
    public readonly description: string,
    public readonly status: 'pending' | 'done',
    public readonly createdAt: Date
  ) {}
}