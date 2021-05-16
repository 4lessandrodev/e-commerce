import { ExchangeFactorValueObject } from './exchange-factor.value-object';

describe('exchange-factor.value-object', () => {
  //
  it('should be defined', () => {
    const exchange = ExchangeFactorValueObject.create(7);
    expect(exchange).toBeDefined();
  });

  it('should fail if provide zero', () => {
    const exchange = ExchangeFactorValueObject.create(0);
    expect(exchange.isFailure).toBe(true);
  });

  it('should fail if provide greater than 7', () => {
    const exchange = ExchangeFactorValueObject.create(10);
    expect(exchange.isFailure).toBe(true);
  });

  it('should create with success', () => {
    const exchange = ExchangeFactorValueObject.create(3);
    expect(exchange.isSuccess).toBe(true);
    expect(exchange.getResult().value).toBe(3);
  });
});
