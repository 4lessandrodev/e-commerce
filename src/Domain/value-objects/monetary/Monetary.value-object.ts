import { Result, ValueObject } from '../../../Shared';
import {
  convertPositiveNumberToNegative,
  formatNumberToCurrency,
} from '../../utils';
import { Currency } from './Currency.value-object';

export enum MonetaryType {
  POSITIVE = 'POSITIVE',
  NEGATIVE = 'NEGATIVE',
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
    private type: keyof typeof MonetaryType,
  ) {
    super(props);
  }

  /**
   * Returns always positive value
   */
  get value(): number {
    return this.props.currency.value;
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
  getCurrencyStringValue(): string {
    return formatNumberToCurrency(this.props.currency);
  }

  /**
   * Returns a real string currency format value
   * `"R$ 20,00"` or `"-R$ 20,00"`
   */
  getRealCurrencyStringValuePositiveOrNegative(): string {
    const value = this.getRealValuePositiveOrNegative();
    const props = this.props.currency.props;
    return formatNumberToCurrency(
      Currency.create({
        ...props,
        value,
      }).getResult(),
    );
  }

  /**
   * Returns a real number value, if negative `-20.00` or positive `20.00`
   */
  getRealValuePositiveOrNegative(): number {
    if (this.type === 'NEGATIVE') {
      return convertPositiveNumberToNegative(this.props.currency.value);
    }
    return this.props.currency.value;
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
    currency.positifyValue();
    return Result.ok(new MonetaryValueObject({ currency }, 'NEGATIVE'));
  }
}
