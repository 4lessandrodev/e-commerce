import { BasketItemMapper } from './basket-item.mapper';
import {
  BasketItemValueObject as Aggregate,
  ExchangeFactorValueObject,
  ProductDescriptionValueObject,
  QuantityInStockValueObject,
} from '@domain/value-objects';
import { Item as Schema } from '../entities/basket.schema';
import { ProductId } from '@domain/aggregates-root';
import { UniqueEntityID } from 'types-ddd/dist/src';

describe('basket-item.mapper', () => {
  //
  const domain: Aggregate = Aggregate.create({
    description:
      ProductDescriptionValueObject.create('valid_description').getResult(),
    exchangeFactor: ExchangeFactorValueObject.create(2).getResult(),
    productId: ProductId.create(new UniqueEntityID('valid_id')),
    quantity: QuantityInStockValueObject.create(7).getResult(),
    availableStock: QuantityInStockValueObject.create(10).getResult(),
  }).getResult();
  //
  const persistence: Schema = {
    description: 'valid_description',
    exchangeFactor: 2,
    productId: 'valid_id',
    quantity: 7,
    availableStock: 10,
  };
  //
  it('should be defined', () => {
    const mapper = new BasketItemMapper();
    expect(mapper).toBeDefined();
  });

  it('should convert from domain to persistence', () => {
    const mapper = new BasketItemMapper();
    const result = mapper.toPersistence(domain);
    expect(result).toEqual(persistence);
  });

  it('should convert from persistence to domain', () => {
    const mapper = new BasketItemMapper();
    const result = mapper.toDomain(persistence);
    expect(result).toEqual(domain);
  });
});
