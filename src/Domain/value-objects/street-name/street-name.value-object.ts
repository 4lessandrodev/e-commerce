import { Result, ValueObject } from 'types-ddd';
import { validateStringLengthBetweenMaxAndMin } from '@domain/utils';
import { ERROR_STREET_NAME_LENGTH } from './street-name-errors.domain';
export const MIN_STREET_NAME_LENGTH = 1;
export const MAX_STREET_NAME_LENGTH = 40;

export interface StreetNameProps {
	value: string;
}

export class StreetNameValueObject extends ValueObject<StreetNameProps> {
	private constructor(props: StreetNameProps) {
		super(props);
	}

	get value(): string {
		return this.props.value;
	}

	public static create(street: string): Result<StreetNameValueObject> {
		const isValidStreetLength = validateStringLengthBetweenMaxAndMin({
			maxLength: MAX_STREET_NAME_LENGTH,
			minLength: MIN_STREET_NAME_LENGTH,
			text: street
		});

		if (!isValidStreetLength) {
			return Result.fail<StreetNameValueObject>(ERROR_STREET_NAME_LENGTH);
		}

		return Result.ok<StreetNameValueObject>(
			new StreetNameValueObject({ value: street })
		);
	}
}
