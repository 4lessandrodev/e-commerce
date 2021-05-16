import { Result, ValueObject } from 'types-ddd';
export const MAX_EXCHANGE_FACTOR = 5;
export const MIN_EXCHANGE_FACTOR = 1;

import { ProductId } from '@domain/aggregates-root';
import { ERROR_INVALID_EXCHANGE_FACTOR_RANGE } from './basket-item-errors.domain';

export interface BasketItemValue {
  productId: ProductId;
  exchangeFactor: number;
  quantity: number;
  description: string;
}

export interface BasketItemProps {
  value: BasketItemValue;
}

export class BasketItemValueObject extends ValueObject<BasketItemProps> {
  constructor(props: BasketItemProps) {
    super(props);
  }

  get value(): BasketItemValue {
    return this.props.value;
  }

  public static create(props: BasketItemValue): Result<BasketItemValueObject> {
    const isValidExchangeFactor =
      props.exchangeFactor >= MIN_EXCHANGE_FACTOR &&
      props.exchangeFactor < MAX_EXCHANGE_FACTOR;

    if (!isValidExchangeFactor) {
      return Result.fail<BasketItemValueObject>(
        ERROR_INVALID_EXCHANGE_FACTOR_RANGE,
      );
    }

    return Result.ok<BasketItemValueObject>(
      new BasketItemValueObject({ value: props }),
    );
  }
}
