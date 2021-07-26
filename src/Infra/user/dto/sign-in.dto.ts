import { IsEmail, Length } from 'class-validator';
import {
	MAX_PASSWORD_LENGTH,
	MIN_PASSWORD_LENGTH
} from '@domain/value-objects';

export class SignInDto {
	@IsEmail()
	email!: string;

	@Length(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH)
	password!: string;
}
