import currency = require('currency.js');
import { Result } from 'types-ddd';
import { Currency } from './currency.value-object';
import { MonetaryValueObject } from './monetary.value-object';

describe('Monetary.value-object.ts', () => {
  interface ImakeSut {
    currency: Result<Currency>;
    monetary: Result<MonetaryValueObject>;
  }
  const makeSut = (value: number): ImakeSut => {
    const currency = Currency.create(value);
    const monetary = MonetaryValueObject.create(currency.getResult());
    return {
      currency,
      monetary,
    };
  };

  it('Should create a valid monetary value ', () => {
    const MonetaryCreateResult = makeSut(10).monetary.getResult();
    expect(MonetaryCreateResult.value).toBeDefined();
    expect(MonetaryCreateResult.value).toBe(10);
    expect(MonetaryCreateResult.isPositive()).toBe(true);
  });

  it('Should return positive value if provide a negative value to monetary', () => {
    const MonetaryCreateResult = makeSut(-10).monetary.getResult();
    expect(MonetaryCreateResult.isPositive()).toBe(false);
    expect(MonetaryCreateResult.getAlwaysPositiveValue()).toBe(10);
  });

  it('Should return negative type if provide a negative value to monetary', () => {
    const MonetaryCreateResult = makeSut(-10).monetary.getResult();
    expect(MonetaryCreateResult.isPositive()).toBe(false);
    expect(MonetaryCreateResult.value).toBe(-10);
  });

  it('Should return a string currency format', () => {
    const MonetaryCreateResult = makeSut(10).monetary.getResult();
    expect(MonetaryCreateResult.getCurrencyStringValue()).toBeDefined();
    expect(MonetaryCreateResult.isPositive()).toBe(true);
    expect(
      MonetaryCreateResult.getCurrencyStringValue()
        .toString()
        .trim()
        .replace(/\s/g, ''),
    ).toBe('R$10,00');
  });

  it('Should return a negative value in currency string format', () => {
    const MonetaryCreateResult = makeSut(-10).monetary.getResult();
    const textResult =
      MonetaryCreateResult.getRealCurrencyStringValuePositiveOrNegative();
    expect(MonetaryCreateResult.isPositive()).toBe(false);
    expect(textResult.toString().trim().replace(/\s/g, '')).toBe('-R$10,00');
  });

  it('Should fail on calculate', () => {
    const valueA = 0.03;
    const valueB = 0.01;
    const result = valueA - valueB;
    expect(result).not.toBe(0.02);
  });

  it('Should calculate with success', () => {
    //

    const valueA = MonetaryValueObject.create(
      Currency.create(0.01).getResult(),
    ).getResult();

    const valueB = MonetaryValueObject.create(
      Currency.create(0.03).getResult(),
    ).getResult();

    const result = currency(valueB.value).subtract(valueA.value).value;
    expect(result).toBe(0.02);
  });
});
