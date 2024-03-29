import { Role, Roles } from '@domain/aggregates-root';
import {
	IsOptional,
	IsEmail,
	IsEnum,
	IsBooleanString,
	IsNumberString
} from 'class-validator';

export class GetUsersDto {
	@IsOptional()
	@IsEmail()
	email?: string;

	@IsOptional()
	@IsEnum(Roles)
	role?: Role;

	@IsOptional()
	@IsBooleanString()
	is_the_email_confirmed?: boolean;

	@IsOptional()
	@IsNumberString()
	limit?: number;

	@IsOptional()
	@IsNumberString()
	offset?: number;
}
