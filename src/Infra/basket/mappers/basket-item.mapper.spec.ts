import { BasketItemMapper } from './basket-item.mapper';
import { BasketItemValueObject as Aggregate } from '@domain/value-objects';
import { Item as Schema } from '../entities/basket.schema';
import { ProductId } from '@domain/aggregates-root';
import { UniqueEntityID } from 'types-ddd/dist/src';

describe('basket-item.mapper', () => {
  //
  const domain: Aggregate = Aggregate.create({
    description: 'valid_description',
    exchangeFactor: 2,
    productId: ProductId.create(new UniqueEntityID('valid_id')),
    quantity: 7,
  }).getResult();
  //
  const persistence: Schema = {
    description: 'valid_description',
    exchangeFactor: 2,
    productId: 'valid_id',
    quantity: 7,
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
