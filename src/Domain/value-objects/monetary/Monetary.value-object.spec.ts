import { MonetaryValueObject, MonetaryType } from './Monetary.value-object';

describe('Monetary.value-object.ts', () => {
  it('Should create a valid monetary value ', () => {
    const MonetaryCreateResult = MonetaryValueObject.create(10).getResult();
    expect(MonetaryCreateResult.getValue()).toBeDefined();
    expect(MonetaryCreateResult.getValue()).toBeGreaterThan(0);
    expect(MonetaryCreateResult.getValue()).toBe(10);
  });

  it('Should return positive value if provide a negative value to monetary', () => {
    const MonetaryCreateResult = MonetaryValueObject.create(-10).getResult();
    expect(MonetaryCreateResult.getValue()).toBeDefined();
    expect(MonetaryCreateResult.getValue()).toBeGreaterThan(0);
    expect(MonetaryCreateResult.getValue()).toBe(10);
  });

  it('Should return negative type if provide a negative value to monetary', () => {
    const MonetaryCreateResult = MonetaryValueObject.create(-10).getResult();
    expect(MonetaryCreateResult.getType()).toBeDefined();
    expect(MonetaryCreateResult.getType()).toBe(MonetaryType.NEGATIVE),
      expect(MonetaryCreateResult.getValue()).toBe(10);
  });

  it('Should return a string currency format', () => {
    const MonetaryCreateResult = MonetaryValueObject.create(-10).getResult();
    expect(MonetaryCreateResult.getCurrencyStringValue()).toBeDefined();
    expect(MonetaryCreateResult.getCurrencyStringValue()).toBe('R$ 10,00');
  });

  it('Should return a negative value in currency string format', () => {
    const MonetaryCreateResult = MonetaryValueObject.create(-10).getResult();
    const textResult = MonetaryCreateResult.getRealCurrencyStringValuePositiveOrNegative();
    expect(textResult).toBe('-R$ 10,00');
  });

  it('Should return a real negative number value', () => {
    const MonetaryCreateResult = MonetaryValueObject.create(-10).getResult();
    const textResult = MonetaryCreateResult.getRealValuePositiveOrNegative();
    expect(textResult).toBe(-10);
  });

  it('Should return a real positive number value', () => {
    const MonetaryCreateResult = MonetaryValueObject.create(10).getResult();
    const textResult = MonetaryCreateResult.getRealValuePositiveOrNegative();
    expect(textResult).toBe(10);
  });
});
