export const MIN_STOCK_QUANTITY_VALUE = 0;
export const MAX_STOCK_QUANTITY_VALUE = 1000;
import { Result, ValueObject } from 'types-ddd';
import { validateNumberBetweenMaxAndMin } from '@domain/utils';
import { ERROR_INVALID_STOCK_VALUE } from './quantity-in-stock-errors.domain';

export interface QuantityInStockProps {
  value: number;
}

export class QuantityInStockValueObject extends ValueObject<QuantityInStockProps> {
  private constructor(props: QuantityInStockProps) {
    super(props);
  }

  get value(): number {
    return parseInt(this.props.value.toFixed(0), 10);
  }

  public static create(quantity: number): Result<QuantityInStockValueObject> {
    //
    const isValidQuantity = validateNumberBetweenMaxAndMin({
      max: MAX_STOCK_QUANTITY_VALUE,
      min: MIN_STOCK_QUANTITY_VALUE,
      value: quantity,
    });
    if (!isValidQuantity) {
      return Result.fail<QuantityInStockValueObject>(ERROR_INVALID_STOCK_VALUE);
    }
    return Result.ok<QuantityInStockValueObject>(
      new QuantityInStockValueObject({ value: quantity }),
    );
  }
}
