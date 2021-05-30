import { IMapper, UniqueEntityID } from 'types-ddd';
import {
  BasketItemValueObject,
  ExchangeFactorValueObject,
  ImageValueObject,
  ProductDescriptionValueObject,
  QuantityAvailableValueObject,
  UnitOfMeasurementValueObject,
} from '@domain/value-objects';
import { Item } from '../entities/order-custom-basket-item.schema';
import { ProductId } from '@domain/aggregates-root';

export class CustomBasketItemMapper
  implements IMapper<BasketItemValueObject, Item>
{
  toDomain(target: Item): BasketItemValueObject {
    return BasketItemValueObject.create({
      availableStock: QuantityAvailableValueObject.create(
        target.quantity,
      ).getResult(),
      description: ProductDescriptionValueObject.create(
        target.description,
      ).getResult(),
      exchangeFactor: ExchangeFactorValueObject.create(
        target.exchangeFactor,
      ).getResult(),
      productId: ProductId.create(new UniqueEntityID(target.productId)),
      quantity: QuantityAvailableValueObject.create(
        target.quantity,
      ).getResult(),
      unitOfMeasurement: UnitOfMeasurementValueObject.create(
        target.unitOfMeasurement,
      ).getResult(),
      image: target.image
        ? ImageValueObject.create(target.image).getResult()
        : undefined,
    }).getResult();
  }

  toPersistence(target: BasketItemValueObject): Item {
    return {
      description: target.value.description.value,
      exchangeFactor: target.value.exchangeFactor.value,
      image: target.value.image?.value,
      productId: target.value.productId.id.toString(),
      quantity: target.value.quantity.value,
      unitOfMeasurement: target.value.unitOfMeasurement.value,
    };
  }
}
