import { Role } from '@domain/aggregates-root';

export class GetUsersFilter {
	id?: string;
	email?: string;
	role?: Role;
	isTheEmailConfirmed?: boolean;
}

export class Pagination {
	limit?: number;
	offset?: number;
}
