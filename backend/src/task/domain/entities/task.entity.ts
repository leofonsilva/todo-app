export class Task {
  constructor(
    public id: string,
    public userId: string,
    public title: string,
    public description: string,
    public status: 'pending' | 'in-progress' | 'done',
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}