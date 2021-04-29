import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserQueryInterface } from '../interfaces/user.query.interface';
import { User, UserDocument } from '../user.schema';

@Injectable()
export class UserQuery implements UserQueryInterface {
  constructor(
    @InjectModel(User.name) private readonly conn: Model<UserDocument>,
  ) {}

  async getMyProfile(id: string): Promise<User> {
    const profile = await this.conn.findOne(
      { id },
      { password: 0, _id: 0, role: 0, __v: 0, terms: 0 },
    );
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile;
  }
}
