import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserRepository } from 'src/modules/user/domain/repositories/user.repository.interface';
import { User } from 'src/modules/user/domain/entities/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel('User') private readonly model: Model<any>,
  ) { }

  async create(user: User): Promise<User> {
    const created = await this.model.create({ ...user });
    user.id = created.id;
    return user;
  }

  async findById(id: string): Promise<User | null> {
    return this.model.findById(id).exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.model.findOne({ email }).exec();
  }
}
