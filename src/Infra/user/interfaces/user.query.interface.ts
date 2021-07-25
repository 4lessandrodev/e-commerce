import { User } from '../entities/user.schema';
import { GetUsersPayload } from './get-users-payload.interface';
import { GetUsersFilter, Pagination } from './query-filter.interface';

export interface UserQueryInterface {
	getMyProfile: (id: string) => Promise<User>;
	getUsers: (
		filter: GetUsersFilter,
		pagination: Pagination
	) => Promise<GetUsersPayload>;
}
