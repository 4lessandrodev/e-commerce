import { OrderIdValueObject } from './order-id.value-object';

describe('order-id.value-object', () => {
  it('should be defined', () => {
    const orderId = OrderIdValueObject.create();
    expect(orderId).toBeDefined();
  });

  it('should generate a new id if not provide value', () => {
    const orderId = OrderIdValueObject.create();
    expect(orderId.getResult().value.length).toBeGreaterThan(4);
  });

  it('should return the same value', () => {
    const orderId = OrderIdValueObject.create('valid_value');
    expect(orderId.getResult().value).toBe('valid_value');
  });

  it('should generate a unique value', () => {
    const values = [OrderIdValueObject.create().getResult().value];

    const two = OrderIdValueObject.create().getResult().value;
    expect(values.includes(two)).toBe(false);

    values.push(two);

    const three = OrderIdValueObject.create().getResult().value;

    expect(values.includes(three)).toBe(false);
    values.push(three);

    const four = OrderIdValueObject.create().getResult().value;
    expect(values.includes(four)).toBe(false);
  });
});
