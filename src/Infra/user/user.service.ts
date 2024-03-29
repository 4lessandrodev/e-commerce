import {
	Inject,
	Injectable,
	PreconditionFailedException
} from '@nestjs/common';

import { SignUpUseCase } from '@app/sign-up-use-case/sign-up.use-case';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { Payload } from './interfaces/payload.interface';
import { SignInUseCase } from '@app/sign-in-use-case/sign-in.use-case';
import { User } from './entities/user.schema';
import { UserQuery } from './query/user.query';
import { Result } from 'types-ddd';
import {
	Pagination,
	GetUsersFilter
} from './interfaces/query-filter.interface';
import { GetUsersPayload } from './interfaces/get-users-payload.interface';

@Injectable()
export class UserService {
	constructor(
		@Inject(SignInUseCase) private readonly signInUseCase: SignInUseCase,

		@Inject(SignUpUseCase) private readonly signUpUseCase: SignUpUseCase,

		@Inject(UserQuery) private readonly userQuery: UserQuery
	) {}

	private checkResult(result: Result<any>): void {
		if (result.isFailure) {
			throw new PreconditionFailedException(result.error);
		}
	}

	async signIn(dto: SignInDto): Promise<Payload> {
		const result = await this.signInUseCase.execute(dto);

		this.checkResult(result);
		return { token: result.getResult().token };
	}

	async SignUp(dto: SignUpDto): Promise<void> {
		const result = await this.signUpUseCase.execute(dto);
		this.checkResult(result);
	}

	// Query Repository
	async getMyProfile(id: string): Promise<User> {
		return await this.userQuery.getMyProfile(id);
	}

	async getUsers(
		filter: GetUsersFilter,
		pagination: Pagination
	): Promise<GetUsersPayload> {
		return await this.userQuery.getUsers(filter, pagination);
	}

	async getUserById(id: string): Promise<User | null> {
		return await this.userQuery.getUserById(id);
	}
}
