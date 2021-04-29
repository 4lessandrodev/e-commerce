import {
  ERROR_INVALID_CURRENCY,
  ERROR_INVALID_LOCALE,
} from './CurrencyErrors.value-object';
import { Result, ValueObject } from 'types-ddd';
import {
  transformMonetaryValueInTwoDecimalsValue,
  validateEnumIncludesValue,
} from '@domain/utils';

enum AvailableCurrency {
  BRL = 'Brazilian Real',
  USD = 'American Dollar',
  EUR = 'Euro',
}

export enum AvailableLocale {
  BR = 'pt-BR',
  PT = 'pt-PT',
  AU = 'en-AU',
  CA = 'en-CA',
  GB = 'en-GB',
  US = 'en-US',
  ZA = 'en-ZA',
}

export interface CurrencyProps {
  value: number;
  symbol: keyof typeof AvailableCurrency;
  /**
   * BR = `pt-BR`
   * PT = `pt-PT`
   * AU = `en-AU`
   * CA = `en-CA`
   * GB = `en-GB`
   * US = `en-US`
   * ZA = `en-ZA`
   */
  locale: keyof typeof AvailableLocale;
}

export class Currency extends ValueObject<CurrencyProps> {
  private constructor(props: CurrencyProps) {
    super(props);
  }

  get value(): number {
    return this.props.value;
  }

  get symbol(): keyof typeof AvailableCurrency {
    return this.props.symbol;
  }

  get locale(): AvailableLocale {
    return AvailableLocale[this.props.locale];
  }

  private static isValidCurrency = (currency: AvailableCurrency) => {
    return validateEnumIncludesValue({
      enum: AvailableCurrency,
      value: currency,
    });
  };

  changePrice(value: number): void {
    this.props.value = value;
  }

  private static isValidLocale = (locale: AvailableLocale) => {
    return validateEnumIncludesValue({ enum: AvailableLocale, value: locale });
  };

  public static create(props: CurrencyProps): Result<Currency> {
    //
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