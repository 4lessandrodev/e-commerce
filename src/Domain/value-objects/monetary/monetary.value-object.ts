import { Result, ValueObject } from 'types-ddd';
import {
	convertNegativeNumberToPositive,
	formatNumberToCurrency
} from '@domain/utils';
import { Currency } from './currency.value-object';
import * as currencyUtil from 'currency.js';

export enum MonetaryType {
	POSITIVE = 'POSITIVE',
	NEGATIVE = 'NEGATIVE'
}

interface MonetaryProps {
	currency: Currency;
}

/**
 * @extends ValueObject
 */
export class MonetaryValueObject extends ValueObject<MonetaryProps> {
	private constructor(
		props: MonetaryProps,
		private readonly type: keyof typeof MonetaryType
	) {
		super(props);
	}

	/**
	 * Returns a real number value, if negative `-20.00` or positive `20.00`
	 */
	get value(): number {
		return currencyUtil(this.props.currency.value).value;
	}

	get currency(): Readonly<Currency> {
		return Object.freeze(this.props.currency);
	}

	/**
	 * Returns type from an instance of MonetaryValueObject
	 * `true` if "POSITIVE" or `false` "NEGATIVE"
	 */
	isPositive(): boolean {
		return this.type === 'POSITIVE';
	}

	/**
	 * Returns a string currency format value always positive
	 * `"R$ 20,00"`
	 */
	getCurrencyStringValueWithSymbol(): string {
		return formatNumberToCurrency(this.props.currency);
	}

	/**
	 * Returns a real string currency format value
	 * `"R$ 20,00"` or `"-R$ 20,00"`
	 */
	getRealCurrencyStringValuePositiveOrNegative(): string {
		return formatNumberToCurrency(this.props.currency);
	}

	/**
	 * Returns a always positive number even if value is negative
	 */
	getAlwaysPositiveValue(): number {
		if (this.type === 'NEGATIVE') {
			return convertNegativeNumberToPositive(this.value);
		}
		return currencyUtil(this.value).value;
	}

	/**
	 * Returns `Result.ok`with an instance of `MonetaryValueObject`
	 * @param value type number.
	 * If provided an invalid email will returns `Result.fail`
	 */
	public static create(currency: Currency): Result<MonetaryValueObject> {
		if (currency.value >= 0) {
			return Result.ok(new MonetaryValueObject({ currency }, 'POSITIVE'));
		}

		return Result.ok(new MonetaryValueObject({ currency }, 'NEGATIVE'));
	}
}
