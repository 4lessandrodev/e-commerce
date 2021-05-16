import { IMapper, UniqueEntityID } from 'types-ddd/dist/src';
import { BasketItemValueObject as Aggregate } from '@domain/value-objects';
import { ExchangeFactorValueObject } from '@domain/value-objects';
import { QuantityInStockValueObject } from '@domain/value-objects';
import { ProductDescriptionValueObject } from '@domain/value-objects';
import { Item as Schema } from '../entities/basket.schema';
import { ProductId } from '@domain/aggregates-root';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BasketItemMapper implements IMapper<Aggregate, Schema> {
  toDomain(target: Schema): Aggregate {
    return Aggregate.create({
      description: ProductDescriptionValueObject.create(
        target.description,
      ).getResult(),
      exchangeFactor: ExchangeFactorValueObject.create(
        target.exchangeFactor,
      ).getResult(),
      productId: ProductId.create(new UniqueEntityID(target.productId)),
      quantity: QuantityInStockValueObject.create(target.quantity).getResult(),
    }).getResult();
  }
  //
  toPersistence(target: Aggregate): Schema {
    return {
      description: target.value.description.value,
      exchangeFactor: target.value.exchangeFactor.value,
      productId: target.value.productId.id.toString(),
      quantity: target.value.quantity.value,
    };
  }
}
