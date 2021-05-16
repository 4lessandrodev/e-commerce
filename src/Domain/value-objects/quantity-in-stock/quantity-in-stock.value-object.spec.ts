import { QuantityInStockValueObject } from './quantity-in-stock.value-object';

describe('quantity-in-stock.value-object', () => {
  it('should be defined', () => {
    const quantity = QuantityInStockValueObject.create(10);
    expect(quantity).toBeDefined();
  });

  it('should fail if value is greater than 1000', () => {
    const quantity = QuantityInStockValueObject.create(1001);
    expect(quantity.isFailure).toBe(true);
  });

  it('should fail if value is less than 0', () => {
    const quantity = QuantityInStockValueObject.create(-10);
    expect(quantity.isFailure).toBe(true);
  });

  it('should create quantity with success', () => {
    const quantity = QuantityInStockValueObject.create(101);
    expect(quantity.isSuccess).toBe(true);
    expect(quantity.getResult().value).toBe(101);
  });
});
