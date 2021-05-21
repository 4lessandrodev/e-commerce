import { ERROR_ORDER_STATUS_INVALID } from './order-status-errors.domain';
import { OrderStatusValueObject } from './order-status.value-object';

describe('order-status.value-object', () => {
  it('should create a valid value object', () => {
    const status = OrderStatusValueObject.create('DECLINED');
    expect(status.isSuccess).toBe(true);
    expect(status.getResult().value).toBe('DECLINED');
  });

  it('should fail if provide an invalid value', () => {
    const status = OrderStatusValueObject.create('INVALID' as any);
    expect(status.isFailure).toBe(true);
    expect(status.error).toBe(ERROR_ORDER_STATUS_INVALID);
  });
});
