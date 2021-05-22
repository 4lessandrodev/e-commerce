import { QuantityAvailableValueObject } from './quantity-in-stock.value-object';

describe('quantity-in-stock.value-object', () => {
  it('should be defined', () => {
    const quantity = QuantityAvailableValueObject.create(10);
    expect(quantity).toBeDefined();
  });

  it('should fail if value is greater than 1000', () => {
    const quantity = QuantityAvailableValueObject.create(1001);
    expect(quantity.isFailure).toBe(true);
  });

  it('should fail if value is less than 0', () => {
    const quantity = QuantityAvailableValueObject.create(-10);
    expect(quantity.isFailure).toBe(true);
  });

  it('should create quantity with success', () => {
    const quantity = QuantityAvailableValueObject.create(101);
    expect(quantity.isSuccess).toBe(true);
    expect(quantity.getResult().value).toBe(101);
  });

  it('should round if provide fraction value', () => {
    const quantity = QuantityAvailableValueObject.create(10.4);
    expect(quantity.isSuccess).toBe(true);
    expect(quantity.getResult().value).toBe(10);
  });
});
