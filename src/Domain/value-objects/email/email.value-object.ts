import { ERROR_INVALID_EMAIL_FORMAT } from './email-errors.domain';
import { isValidEmail, transformStringToLowerCase } from '@domain/utils';
import { Result, ValueObject } from 'types-ddd';
export interface EmailValueObjectProps {
	value: string;
}

/**
 * @extends ValueObject
 */
export class EmailValueObject extends ValueObject<EmailValueObjectProps> {
	private constructor(props: EmailValueObjectProps) {
		super(props);
	}

	/**
	 * Returns a email string
	 */
	get value(): string {
		return this.props.value;
	}

	/**
	 * @param value is email string.
	 * Returns a `Result.ok` with instance of `EmailValueObject`
	 * if invalid email is provided return `Result.fail`
	 */
	public static create(value: string): Result<EmailValueObject> {
		const isValid = isValidEmail(value);
		if (!isValid) {
			return Result.fail<EmailValueObject>(ERROR_INVALID_EMAIL_FORMAT);
		}
		const lowerCaseEmail = transformStringToLowerCase(value);
		return Result.ok<EmailValueObject>(
			new EmailValueObject({ value: lowerCaseEmail })
		);
	}
}
