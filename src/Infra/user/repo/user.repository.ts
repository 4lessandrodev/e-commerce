import { Filter } from 'types-ddd';
import { User as Aggregate } from '@domain/aggregates-root';
import { UserRepositoryInterface } from '@repo/user-repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@infra/user/entities/user.schema';
import { Model } from 'mongoose';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectModel(User.name) private readonly conn: Model<UserDocument>,
    @Inject(UserMapper) private readonly mapper: UserMapper,
  ) {}

  async exists(filter: Filter): Promise<boolean> {
    return await this.conn.exists(filter);
  }

  async find(filter: Filter): Promise<Aggregate[] | null> {
    const usersFound = await this.conn.find(filter).exec();
    if (!usersFound) {
      return null;
    }

    return usersFound.map(this.mapper.toDomain);
  }

  async delete(filter: Filter): Promise<void> {
    await this.conn.findOneAndDelete(filter).exec();
  }

  async save(target: Aggregate): Promise<void> {
    const schema = this.mapper.toPersistence(target);
    await this.conn
      .updateOne({ id: target.id }, schema, { upsert: true })
      .exec();
  }

  async findOne(filter: Filter): Promise<Aggregate | null> {
    const userFound = await this.conn.findOne(filter).exec();

    if (!userFound) {
      return null;
    }

    return this.mapper.toDomain(userFound);
  }
}
