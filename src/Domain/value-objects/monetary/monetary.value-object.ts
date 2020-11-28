import { Result } from '../../../Shared/Result';
import { convertNegativeNumberToPositive } from '../../Utils/convert-number-negative-in-positive.domain.util';
import { FormatNumberToCurrency } from '../../Utils/format-number-to-currency.domain.util';
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

  getValue(): number {
    return this.props.value;
  }

  getType(): string {
    return this.props.type;
  }

  getCurrencyStringValue(): string {
    return FormatNumberToCurrency(this.props.value);
  }

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
