import { IMapper, UniqueEntityID } from 'types-ddd/dist/src';
import { BasketItemValueObject as Aggregate } from '@domain/value-objects';
import { Item as Schema } from '../entities/basket.schema';
import { ProductId } from '@domain/aggregates-root';

export class BasketItemMapper implements IMapper<Aggregate, Schema> {
  toDomain(target: Schema): Aggregate {
    return Aggregate.create({
      description: target.description,
      exchangeFactor: target.exchangeFactor,
      productId: ProductId.create(new UniqueEntityID(target.productId)),
      quantity: target.quantity,
    }).getResult();
  }
  //
  toPersistence(target: Aggregate): Schema {
    return {
      description: target.value.description,
      exchangeFactor: target.value.exchangeFactor,
      productId: target.value.productId.id.toString(),
      quantity: target.value.quantity,
    };
  }
}
