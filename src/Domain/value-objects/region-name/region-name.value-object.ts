import { Result, ValueObject } from 'types-ddd';
import { validateStringLengthBetweenMaxAndMin } from '@domain/utils';
import { ERROR_REGION_NAME_LENGTH } from './region-name-errors.domain';
export const MIN_REGION_NAME_LENGTH = 1;
export const MAX_REGION_NAME_LENGTH = 20;

export interface RegionNameProps {
	value: string;
}

export class RegionNameValueObject extends ValueObject<RegionNameProps> {
	private constructor(props: RegionNameProps) {
		super(props);
	}

	get value(): string {
		return this.props.value;
	}

	public static create(name: string): Result<RegionNameValueObject> {
		const isValidStreetLength = validateStringLengthBetweenMaxAndMin({
			maxLength: MAX_REGION_NAME_LENGTH,
			minLength: MIN_REGION_NAME_LENGTH,
			text: name
		});

		if (!isValidStreetLength) {
			return Result.fail<RegionNameValueObject>(ERROR_REGION_NAME_LENGTH);
		}

		return Result.ok<RegionNameValueObject>(
			new RegionNameValueObject({ value: name })
		);
	}
}
