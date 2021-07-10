import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserQueryInterface } from '../interfaces/user.query.interface';
import { User, UserDocument } from '../entities/user.schema';
import { GetUsersFilter, Pagination } from '../interfaces/query-filter.interface';
import { GetUsersPayload } from '../interfaces/get-users-payload.interface';

@Injectable()
export class UserQuery implements UserQueryInterface {
	constructor (
		@InjectModel(User.name) private readonly conn: Model<UserDocument>,
	) { }

	async getMyProfile (id: string): Promise<User> {
		const profile = await this.conn.findOne(
			{ id },
			{ _id: 0, role: 0, __v: 0, terms: 0, password: 0 },
		);
		if (!profile) {
			throw new NotFoundException('Profile not found');
		}
		return profile;
	}

	async getUsers (filter: GetUsersFilter, pagination: Pagination): Promise<GetUsersPayload> {
		const { limit = 10, offset = 0 } = pagination;

		const skipNumber = parseInt(String(offset));
		const limitNumber = parseInt(String(limit));

		const totalOfRegisters = await this.conn.
			find({ ...filter })
			.countDocuments();

		const hasNextPage = (skipNumber + limitNumber) < totalOfRegisters;
		const hasPreviousPage = skipNumber > 0;

		const users = await this.conn.find({ ...filter },
			{ _id: 0, role: 0, __v: 0, terms: 0, password: 0 })
			.skip(skipNumber)
			.limit(limitNumber);

		return {
			pageInfo: {
				hasNextPage,
				hasPreviousPage,
				totalOfRegisters
			},
			users: [...users]
		};
	}
}
