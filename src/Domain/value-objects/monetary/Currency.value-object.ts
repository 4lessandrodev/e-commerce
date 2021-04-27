import { Result, ValueObject } from 'types-ddd';
import { transformMonetaryValueInTwoDecimalsValue } from '../../utils';
import { validateEnumIncludesValue } from '../../utils/validate-is-string-in-enum.domain.util';
import {
  ERROR_INVALID_CURRENCY,
  ERROR_INVALID_LOCALE,
} from './CurrencyErrors.value-object';

enum AvaliableCurrency {
  BRL = 'Brasilian Real',
  USD = 'American Dollar',
  EUR = 'Euro',
}

export enum AvaliableLocale {
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
  symbol: keyof typeof AvaliableCurrency;
  /**
   * BR = `pt-BR`
   * PT = `pt-PT`
   * AU = `en-AU`
   * CA = `en-CA`
   * GB = `en-GB`
   * US = `en-US`
   * ZA = `en-ZA`
   */
  locale: keyof typeof AvaliableLocale;
}

export class Currency extends ValueObject<CurrencyProps> {
  private constructor(props: CurrencyProps) {
    super(props);
  }

  get value(): number {
    return this.props.value;
  }

  get symbol(): keyof typeof AvaliableCurrency {
    return this.props.symbol;
  }

  get locale(): AvaliableLocale {
    return AvaliableLocale[this.props.locale];
  }

  private static isValidCurrency = (currency: AvaliableCurrency) => {
    return validateEnumIncludesValue({
      enum: AvaliableCurrency,
      value: currency,
    });
  };

  changePrice(value: number): void {
    this.props.value = value;
  }

  private static isValidLocale = (locale: AvaliableLocale) => {
    return validateEnumIncludesValue({ enum: AvaliableLocale, value: locale });
  };

  public static create(props: CurrencyProps): Result<Currency> {
    if (!this.isValidCurrency(AvaliableCurrency[props.symbol])) {
      return Result.fail<Currency>(ERROR_INVALID_CURRENCY);
    }
    if (!this.isValidLocale(AvaliableLocale[props.locale])) {
      return Result.fail<Currency>(ERROR_INVALID_LOCALE);
    }
    props.value = transformMonetaryValueInTwoDecimalsValue(props.value);
    return Result.ok<Currency>(new Currency(props));
  }
}
