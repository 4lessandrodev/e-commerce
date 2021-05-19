import { Result, ValueObject } from 'types-ddd';
import { ProductId } from '@domain/aggregates-root';
import { ExchangeFactorValueObject } from '../exchange-factor/exchange-factor.value-object';
import { QuantityInStockValueObject } from '../quantity-in-stock/quantity-in-stock.value-object';
import { ProductDescriptionValueObject } from '../product-description/product-description.value-object';
import { UnitOfMeasurementValueObject } from '../unit-of-measurement/unit-of-measurement.value-objects';

export interface BasketItemValue {
  productId: ProductId;
  exchangeFactor: ExchangeFactorValueObject;
  quantity: QuantityInStockValueObject;
  availableStock: QuantityInStockValueObject;
  description: ProductDescriptionValueObject;
  unitOfMeasurement: UnitOfMeasurementValueObject;
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
    return Result.ok<BasketItemValueObject>(
      new BasketItemValueObject({ value: props }),
    );
  }
}
