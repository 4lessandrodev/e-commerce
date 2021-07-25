import { Result, ValueObject } from 'types-ddd';
import { validateNumberBetweenMaxAndMin } from '@domain/utils';
import { ERROR_INVALID_STOCK_VALUE } from './quantity-in-stock-errors.domain';
export const MIN_STOCK_QUANTITY_VALUE = 0;
export const MAX_STOCK_QUANTITY_VALUE = 1000;

export interface QuantityAvailableProps {
	value: number;
}

export class QuantityAvailableValueObject extends ValueObject<QuantityAvailableProps> {
	private constructor(props: QuantityAvailableProps) {
		super(props);
	}

	get value(): number {
		return parseInt(this.props.value.toFixed(0), 10);
	}

	public static create(
		quantity: number
	): Result<QuantityAvailableValueObject> {
		//
		const isValidQuantity = validateNumberBetweenMaxAndMin({
			max: MAX_STOCK_QUANTITY_VALUE,
			min: MIN_STOCK_QUANTITY_VALUE,
			value: quantity
		});
		if (!isValidQuantity) {
			return Result.fail<QuantityAvailableValueObject>(
				ERROR_INVALID_STOCK_VALUE
			);
		}
		return Result.ok<QuantityAvailableValueObject>(
			new QuantityAvailableValueObject({ value: quantity })
		);
	}
}
