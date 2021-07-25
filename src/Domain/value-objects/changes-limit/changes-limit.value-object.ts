import { Result, ValueObject } from 'types-ddd';
import { validateNumberBetweenMaxAndMin } from '@domain/utils';
import { ERROR_INVALID_CHANGES_LIMIT } from './changes-limit-errors.domain';
export const MIN_CHANGES_LIMIT_VALUE = 0;
export const MAX_CHANGES_LIMIT_VALUE = 50;

export interface ChangeLimitProps {
	value: number;
}

export class ChangesLimitValueObject extends ValueObject<ChangeLimitProps> {
	private constructor(props: ChangeLimitProps) {
		super(props);
	}

	get value(): number {
		return parseInt(this.props.value.toFixed(0), 10);
	}

	public static create(limit: number): Result<ChangesLimitValueObject> {
		//
		const isValidFactor = validateNumberBetweenMaxAndMin({
			max: MAX_CHANGES_LIMIT_VALUE,
			min: MIN_CHANGES_LIMIT_VALUE,
			value: limit
		});
		if (!isValidFactor) {
			return Result.fail<ChangesLimitValueObject>(
				ERROR_INVALID_CHANGES_LIMIT
			);
		}
		return Result.ok<ChangesLimitValueObject>(
			new ChangesLimitValueObject({ value: limit })
		);
	}
}
