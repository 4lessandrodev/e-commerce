import {
	ERROR_INVALID_CURRENCY,
	ERROR_INVALID_LOCALE,
	ERROR_INVALID_CURRENCY_VALUE
} from './currency-errors.value-object';
import { Result, ValueObject } from 'types-ddd';
import {
	transformMonetaryValueInTwoDecimalsValue,
	validateEnumIncludesValue
} from '@domain/utils';
import * as currencyUtil from 'currency.js';

export enum AvailableCurrency {
	BRL = 'BRL',
	USD = 'USD',
	EUR = 'EUR'
}

export enum AvailableLocale {
	'pt-BR' = 'pt-BR',
	'pt-PT' = 'pt-PT',
	'en-AU' = 'en-AU',
	'en-CA' = 'en-CA',
	'en-GB' = 'en-GB',
	'en-US' = 'en-US',
	'en-ZA' = 'en-ZA'
}

export type localeType = keyof typeof AvailableLocale;
export type currencyType = keyof typeof AvailableCurrency;

export interface CurrencyProps {
	value: number;
	symbol: currencyType;
	/**
	 * BR = `pt-BR`
	 * PT = `pt-PT`
	 * AU = `en-AU`
	 * CA = `en-CA`
	 * GB = `en-GB`
	 * US = `en-US`
	 * ZA = `en-ZA`
	 */
	locale: localeType;
}

export class Currency extends ValueObject<CurrencyProps> {
	private constructor(props: CurrencyProps) {
		super(props);
	}

	get value(): number {
		return currencyUtil(this.props.value).value;
	}

	get symbol(): keyof typeof AvailableCurrency {
		return this.props.symbol;
	}

	get locale(): AvailableLocale {
		return AvailableLocale[this.props.locale];
	}

	private static readonly isValidCurrency = (currency: AvailableCurrency) => {
		return validateEnumIncludesValue({
			enum: AvailableCurrency,
			value: currency
		});
	};

	changePrice(value: number): void {
		this.props.value = value;
	}

	private static readonly isValidLocale = (locale: AvailableLocale) => {
		return validateEnumIncludesValue({
			enum: AvailableLocale,
			value: locale
		});
	};

	multiply(value: number): void {
		this.props.value = currencyUtil(this.props.value).multiply(value).value;
	}

	divide(value: number): void {
		this.props.value = currencyUtil(this.props.value).divide(value).value;
	}

	sum(value: number): void {
		this.props.value = currencyUtil(this.props.value).add(value).value;
	}

	subtract(value: number) {
		this.props.value = currencyUtil(this.props.value).subtract(value).value;
	}

	setLocale(locale: localeType): void {
		this.props.locale = locale;
	}

	setSymbol(symbol: currencyType): void {
		this.props.symbol = symbol;
	}

	public static create(value: number): Result<Currency> {
		//

		const props: CurrencyProps = {
			locale: 'pt-BR',
			symbol: 'BRL',
			value
		};

		const isNumber = typeof props.value === 'number';
		if (!isNumber) {
			return Result.fail<Currency>(ERROR_INVALID_CURRENCY_VALUE);
		}

		if (!this.isValidCurrency(AvailableCurrency[props.symbol])) {
			return Result.fail<Currency>(ERROR_INVALID_CURRENCY);
		}
		//
		if (!this.isValidLocale(AvailableLocale[props.locale])) {
			return Result.fail<Currency>(ERROR_INVALID_LOCALE);
		}

		props.value = transformMonetaryValueInTwoDecimalsValue(props.value);
		return Result.ok<Currency>(new Currency(props));
	}
}
