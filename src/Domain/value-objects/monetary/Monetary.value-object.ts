import { Result } from '../../../Shared/Result';
import { ValueObject } from '../value-object';
import {
  convertPositiveNumberToNegative,
  convertNegativeNumberToPositive,
  formatNumberToCurrency,
  transformMonetaryValueInTwoDecimalsValue,
} from '../../utils';

export enum MonetaryType {
  POSITIVE = 'POSITIVE',
  NEGATIVE = 'NEGATIVE',
}

interface MonetaryProps {
  value: number;
  type: MonetaryType;
}

/**
 * @extends ValueObject
 */
export class MonetaryValueObject extends ValueObject<MonetaryProps> {
  private constructor(props: MonetaryProps) {
    super(props);
  }

  /**
   * Returns always positive value
   */
  getValue(): number {
    return this.props.value;
  }

  /**
   * Returns type from an instance of MonetaryValueObject
   * `"POSITIVE"` or `"NEGATIVE"` as string
   */
  getType(): string {
    return this.props.type;
  }

  /**
   * Returns a string currency format value always positive
   * `"R$ 20,00"`
   */
  getCurrencyStringValue(): string {
    return formatNumberToCurrency(this.props.value);
  }

  /**
   * Returns a real string currency format value
   * `"R$ 20,00"` or `"-R$ 20,00"`
   */
  getRealCurrencyStringValuePositiveOrNegative(): string {
    const value = this.getRealValuePositiveOrNegative();
    return formatNumberToCurrency(value);
  }

  /**
   * Returns a real number value, if negative `-20.00` or positive `20.00`
   */
  getRealValuePositiveOrNegative(): number {
    if (this.props.type === MonetaryType.NEGATIVE) {
      return convertPositiveNumberToNegative(this.props.value);
    }
    return this.props.value;
  }

  /**
   * Returns `Result.ok`with an instance of `MonetaryValueObject`
   * @param value type number.
   * If provided an invalid email will returns `Result.fail`
   */
  public static create(value: number): Result<MonetaryValueObject> {
    let type = MonetaryType.POSITIVE;
    if (value < 0) {
      type = MonetaryType.NEGATIVE;
      value = convertNegativeNumberToPositive(value);
    }
    value = transformMonetaryValueInTwoDecimalsValue(value);
    return Result.ok(new MonetaryValueObject({ type, value }));
  }
}
