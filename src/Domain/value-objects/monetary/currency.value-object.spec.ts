import { Result } from 'types-ddd';
import { Currency, CurrencyProps } from './currency.value-object';

describe('Currency.value-object', () => {
  const makeSut = (props?: CurrencyProps): Result<Currency> => {
    return Currency.create({
      locale: props?.locale ?? 'pt-BR',
      symbol: props?.symbol ?? 'BRL',
      value: props?.value ?? 20,
    });
  };
  it('Should create a valid currency', () => {
    const currency = makeSut();

    expect(currency.isFailure).toBe(false);
    expect(currency.getResult().locale).toBe('pt-BR');
    expect(currency.getResult().symbol).toBe('BRL');
    expect(currency.getResult().value).toBe(20);
  });

  it('Should positify a currency', () => {
    const currency = makeSut({
      locale: 'en-GB',
      symbol: 'EUR',
      value: -20,
    });
    expect(currency.isFailure).toBe(false);
    expect(currency.getResult().locale).toBe('en-GB');
    expect(currency.getResult().symbol).toBe('EUR');
    expect(currency.getResult().value).toBe(-20);
  });
});
