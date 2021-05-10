import { ProductId } from '@domain/aggregates-root';
import {
  BasketItemValueObject,
  MAX_EXCHANGE_FACTOR,
  MIN_EXCHANGE_FACTOR,
} from './BasketItem.value-object';
import { ERROR_INVALID_EXCHANGE_FACTOR_RANGE } from './BasketItemErrors.domain';

describe('BasketItem.value-object', () => {
  it('should be defined', () => {
    const item = BasketItemValueObject.create({
      exchangeFactor: 3,
      productId: ProductId.create(),
      description: 'valid_description',
      quantity: 2,
    });
    expect(item).toBeDefined();
    expect(item.isSuccess).toBe(true);
  });

  it('should fail if provide a value greater than max permitted', () => {
    const item = BasketItemValueObject.create({
      exchangeFactor: MAX_EXCHANGE_FACTOR + 1,
      productId: ProductId.create(),
      description: 'valid_description',
      quantity: 2,
    });
    expect(item.isFailure).toBe(true);
    expect(item.error.toString()).toBe(ERROR_INVALID_EXCHANGE_FACTOR_RANGE);
  });

  it('should fail if provide a value greater than max permitted', () => {
    const item = BasketItemValueObject.create({
      exchangeFactor: MIN_EXCHANGE_FACTOR - 1,
      productId: ProductId.create(),
      description: 'valid_description',
      quantity: 2,
    });
    expect(item.isFailure).toBe(true);
    expect(item.error.toString()).toBe(ERROR_INVALID_EXCHANGE_FACTOR_RANGE);
  });
});
