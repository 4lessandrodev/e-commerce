import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '@domain/aggregates-root';
import { JwtPayload } from '../interfaces/jwt.payload.interface';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserDocument } from '../user.schema';
import { JWT_SECRET } from '../../configs/env';

@Injectable()
export class JwtStrategy extends PassportStrategy<any>(Strategy) {
  constructor(
    @InjectModel(User.name) private readonly conn: Model<UserDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    const { id } = payload;

    const userDatabase = await this.conn.findOne({ id });

    if (!userDatabase) {
      throw new UnauthorizedException();
    }

    const user = {
      id: userDatabase.id,
      role: userDatabase.role,
    };
    return user;
  }
}
