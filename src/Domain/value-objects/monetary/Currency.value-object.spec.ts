import { Result } from '../../../Shared';
import { Currency, CurrencyProps } from './Currency.value-object';

describe('Currency.value-object', () => {
  const makeSut = (props?: CurrencyProps): Result<Currency> => {
    return Currency.create({
      locale: props?.locale ?? 'BR',
      simbol: props?.simbol ?? 'BRL',
      value: props?.value ?? 20,
    });
  };
  it('Should create a valid currency', () => {
    const currency = makeSut();

    expect(currency.isFailure).toBe(false);
    expect(currency.getResult().locale).toBe('pt-BR');
    expect(currency.getResult().simbol).toBe('BRL');
    expect(currency.getResult().value).toBe(20);
  });

  it('Should positify a currency', () => {
    const currency = makeSut({
      locale: 'GB',
      simbol: 'EUR',
      value: -20,
    });
    expect(currency.isFailure).toBe(false);
    expect(currency.getResult().locale).toBe('en-GB');
    expect(currency.getResult().simbol).toBe('EUR');
    expect(currency.getResult().value).toBe(-20);
  });
});
