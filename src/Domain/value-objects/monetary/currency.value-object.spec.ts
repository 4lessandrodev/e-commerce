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
});
