import { IsBoolean, IsEmail, IsNotEmpty, Length } from 'class-validator';
import { Term } from '@infra/user/entities/user.schema';
import {
	MAX_PASSWORD_LENGTH,
	MIN_PASSWORD_LENGTH
} from '@domain/value-objects';
export class SignUpDto {
	term!: Term;

	@IsEmail()
	email!: string;

	@Length(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH)
	password!: string;

	@IsBoolean()
	@IsNotEmpty()
	acceptedTerm!: boolean;
}
