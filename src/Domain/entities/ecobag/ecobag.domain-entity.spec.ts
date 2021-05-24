import { Currency, MonetaryValueObject } from '@domain/value-objects';
import { Ecobag } from './ecobag.domain-entity';

describe('ecobag-domain-entity', () => {
  it('should be defined', () => {
    const ecobag = Ecobag.create(
      MonetaryValueObject.create(Currency.create(10).getResult()).getResult(),
    );

    expect(ecobag).toBeDefined();
  });

  it('should generate always the same id', () => {
    const price = MonetaryValueObject.create(
      Currency.create(10).getResult(),
    ).getResult();

    const ecobagA = Ecobag.create(price).getResult();
    const ecobagB = Ecobag.create(price).getResult();
    const ecobagC = Ecobag.create(price).getResult();

    expect(ecobagA.id.toString()).toBe(ecobagB.id.toString());
    expect(ecobagB.id.toString()).toBe(ecobagC.id.toString());
    expect(ecobagC.price.value).toBe(10);
  });

  it('should change the price', () => {
    const price = MonetaryValueObject.create(
      Currency.create(10).getResult(),
    ).getResult();

    const ecobagA = Ecobag.create(price).getResult();
    expect(ecobagA.price.value).toBe(10);

    ecobagA.price.currency.changePrice(20);

    expect(ecobagA.price.value).toBe(20);
  });
});
