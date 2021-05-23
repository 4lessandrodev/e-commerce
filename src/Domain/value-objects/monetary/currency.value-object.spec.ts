import { Result } from 'types-ddd';
import { Currency } from './currency.value-object';

describe('Currency.value-object', () => {
  const makeSut = (value?: number): Result<Currency> => {
    return Currency.create(value ?? 20);
  };
  it('Should create a valid currency', () => {
    const currency = makeSut();

    expect(currency.isFailure).toBe(false);
    expect(currency.getResult().locale).toBe('pt-BR');
    expect(currency.getResult().symbol).toBe('BRL');
    expect(currency.getResult().value).toBe(20);
  });

  it('Should positing a currency', () => {
    const currency = makeSut(-20);
    expect(currency.isFailure).toBe(false);
    expect(currency.getResult().value).toBe(-20);
  });

  it('should divide value with success', () => {
    const currency = Currency.create(0.06).getResult();
    currency.divide(2);
    expect(currency.value).toBe(0.03);
  });

  it('should sum value with success', () => {
    const currency = Currency.create(0.01).getResult();
    currency.sum(0.06);
    expect(currency.value).toBe(0.07);
  });

  it('should multiply value with success', () => {
    const currency = Currency.create(0.03).getResult();
    currency.multiply(3);
    expect(currency.value).toBe(0.09);
  });

  it('should subtract value with success', () => {
    const currency = Currency.create(0.09).getResult();
    currency.subtract(0.03);
    expect(currency.value).toBe(0.06);
  });

  it('should set locale to en-USD', () => {
    const currency = Currency.create(0.09).getResult();
    currency.setLocale('en-US');
    expect(currency.locale).toBe('en-US');
  });

  it('should set symbol to EUR', () => {
    const currency = Currency.create(0.09).getResult();
    currency.setSymbol('EUR');
    expect(currency.symbol).toBe('EUR');
  });
});
