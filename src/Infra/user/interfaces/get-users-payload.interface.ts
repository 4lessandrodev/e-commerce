import { User } from '../entities/user.schema';
export interface PageInfo {
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	totalOfRegisters: number;
}
export interface GetUsersPayload {
	users: User[];
	pageInfo: PageInfo;
}