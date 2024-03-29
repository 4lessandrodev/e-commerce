import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '@domain/aggregates-root';
import { JwtPayload } from '../interfaces/jwt.payload.interface';
import { UserDocument } from '../entities/user.schema';
import { JWT_SECRET } from '@infra/configs/env';

@Injectable()
export class JwtStrategy extends PassportStrategy<any>(Strategy) {
	constructor(
		@InjectModel(User.name) private readonly conn: Model<UserDocument>
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: JWT_SECRET
		});
	}

	async validate(payload: JwtPayload): Promise<JwtPayload> {
		const { id } = payload;

		const userDatabase = await this.conn.findOne({ id });

		if (userDatabase == null) {
			throw new UnauthorizedException();
		}

		const user = {
			id: userDatabase.id,
			role: userDatabase.role
		};
		return user;
	}
}
