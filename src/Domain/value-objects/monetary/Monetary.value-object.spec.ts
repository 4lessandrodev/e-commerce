import { Result } from '../../../Shared';
import { Currency } from './Currency.value-object';
import { MonetaryValueObject } from './Monetary.value-object';

describe('Monetary.value-object.ts', () => {
  interface ImakeSut {
    currency: Result<Currency>;
    monetary: Result<MonetaryValueObject>;
  }
  const makeSut = (value: number): ImakeSut => {
    const currency = Currency.create({
      locale: 'BR',
      simbol: 'BRL',
      value,
    });
    const monetary = MonetaryValueObject.create(currency.getResult());
    return {
      currency,
      monetary,
    };
  };

  it('Should create a valid monetary value ', () => {
    const MonetaryCreateResult = makeSut(10).monetary.getResult();
    expect(MonetaryCreateResult.value).toBeDefined();
    expect(MonetaryCreateResult.value).toBeGreaterThan(0);
    expect(MonetaryCreateResult.value).toBe(10);
    expect(MonetaryCreateResult.isPositive()).toBe(true);
  });

  it('Should return positive value if provide a negative value to monetary', () => {
    const MonetaryCreateResult = makeSut(-10).monetary.getResult();
    expect(MonetaryCreateResult.value).toBeDefined();
    expect(MonetaryCreateResult.value).toBeGreaterThan(0);
    expect(MonetaryCreateResult.isPositive()).toBe(false);
    expect(MonetaryCreateResult.value).toBe(10);
  });

  it('Should return negative type if provide a negative value to monetary', () => {
    const MonetaryCreateResult = makeSut(-10).monetary.getResult();
    expect(MonetaryCreateResult.isPositive()).toBe(false);
    expect(MonetaryCreateResult.value).toBe(10);
  });

  it('Should return a string currency format', () => {
    const MonetaryCreateResult = makeSut(-10).monetary.getResult();
    expect(MonetaryCreateResult.getCurrencyStringValue()).toBeDefined();
    expect(MonetaryCreateResult.isPositive()).toBe(false);
    expect(
      MonetaryCreateResult.getCurrencyStringValue()
        .toString()
        .trim()
        .replace(/\s/g, ''),
    ).toBe('R$10,00');
  });

  it('Should return a negative value in currency string format', () => {
    const MonetaryCreateResult = makeSut(-10).monetary.getResult();
    const textResult = MonetaryCreateResult.getRealCurrencyStringValuePositiveOrNegative();
    expect(MonetaryCreateResult.isPositive()).toBe(false);
    expect(textResult.toString().trim().replace(/\s/g, '')).toBe('-R$10,00');
  });

  it('Should return a real negative number value', () => {
    const MonetaryCreateResult = makeSut(-10).monetary.getResult();
    const textResult = MonetaryCreateResult.getRealValuePositiveOrNegative();
    expect(textResult).toBe(-10);
  });

  it('Should return a real positive number value', () => {
    const MonetaryCreateResult = makeSut(10).monetary.getResult();
    expect(MonetaryCreateResult.isPositive()).toBe(true);
    const textResult = MonetaryCreateResult.getRealValuePositiveOrNegative();
    expect(textResult).toBe(10);
  });
});
