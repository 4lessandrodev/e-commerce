import { Filter } from 'types-ddd/dist/src';
import { User as Aggregate } from '@domain/aggregates-root';
import { UserRepositoryInterface } from '@repo/user-repository.interface';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User, UserDocument } from '@infra/user/user.schema';
import { Model } from 'mongoose';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectModel(User.name) private readonly conn: Model<UserDocument>,
    @Inject(UserMapper) private readonly mapper: UserMapper,
  ) {}

  async exists(filter: Filter): Promise<boolean> {
    return await this.conn.exists({ filter });
  }

  async find(filter: Filter): Promise<Aggregate | null> {
    const userExist = await this.conn.findOne(filter).exec();
    if (!userExist) {
      return null;
    }

    return this.mapper.toDomain(userExist);
  }

  async delete(filter: Filter): Promise<void> {
    await this.conn.findOneAndDelete({ filter }).exec();
  }

  async save(target: Aggregate): Promise<void> {
    const schema = this.mapper.toPersistence(target);
    await this.conn.create(schema);
  }

  // Query Repository
  //---------------------------------------------------------

  async getMyProfile(id: string): Promise<User> {
    const profile = await this.conn.findOne(
      { id },
      { password: 0, _id: 0, role: 0, __v: 0 },
    );
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile;
  }
}
