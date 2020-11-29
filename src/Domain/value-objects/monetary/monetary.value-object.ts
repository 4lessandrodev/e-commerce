import { convertPositiveNumberToNegative } from '../../utils/convert-positive-number-to-negative.domain.util';
import { Result } from '../../../Shared/Result';
import { convertNegativeNumberToPositive } from '../../utils/convert-negative-number-to-positive.domain.util';
import { formatNumberToCurrency } from '../../utils/format-number-to-currency.domain.util';
import { ValueObject } from '../value-object';

export enum MonetaryType {
  POSITIVE = 'POSITIVE',
  NEGATIVE = 'NEGATIVE',
}

interface MonetaryProps {
  value: number;
  type: MonetaryType;
}

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
   * POSITIVE or NEGATIVE
   */
  getType(): string {
    return this.props.type;
  }

  /**
   * Returns a string currency format value always positive
   * R$ 20,00
   */
  getCurrencyStringValue(): string {
    return formatNumberToCurrency(this.props.value);
  }

  /**
   * Returns a real string currency format value
   * "R$ 20,00" or "-R$ 20,00"
   */
  getRealCurrencyStringValuePositiveOrNegative(): string {
    const value = this.getRealValuePositiveOrNegative();
    return formatNumberToCurrency(value);
  }

  /**
   * Returns a real number value, if negative -20.00 or positive 20.00
   */
  getRealValuePositiveOrNegative(): number {
    if (this.props.type === MonetaryType.NEGATIVE) {
      return convertPositiveNumberToNegative(this.props.value);
    }
    return this.props.value;
  }

  /**
   * Returns an instance of monetary value Result
   * @param value type number
   */
  public static create(value: number): Result<MonetaryValueObject> {
    let type = MonetaryType.POSITIVE;
    if (value < 0) {
      type = MonetaryType.NEGATIVE;
      value = convertNegativeNumberToPositive(value);
    }
    value = Number.parseFloat(value.toFixed(2));
    return Result.ok(new MonetaryValueObject({ type, value }));
  }
}
