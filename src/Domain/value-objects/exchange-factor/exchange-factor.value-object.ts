export const MIN_EXCHANGE_FACTOR_VALUE = 1;
export const MAX_EXCHANGE_FACTOR_VALUE = 7;
import { Result, ValueObject } from 'types-ddd';
import { validateNumberBetweenMaxAndMin } from '@domain/utils';
import { ERROR_INVALID_EXCHANGE_FACTOR } from './exchange-factor-errors.domain';

export interface ExchangeFactorProps {
  value: number;
}

export class ExchangeFactorValueObject extends ValueObject<ExchangeFactorProps> {
  private constructor(props: ExchangeFactorProps) {
    super(props);
  }

  get value(): number {
    return this.props.value;
  }

  public static create(factor: number): Result<ExchangeFactorValueObject> {
    //
    const isValidFactor = validateNumberBetweenMaxAndMin({
      max: MAX_EXCHANGE_FACTOR_VALUE,
      min: MIN_EXCHANGE_FACTOR_VALUE,
      value: factor,
    });
    if (!isValidFactor) {
      return Result.fail<ExchangeFactorValueObject>(
        ERROR_INVALID_EXCHANGE_FACTOR,
      );
    }
    return Result.ok<ExchangeFactorValueObject>(
      new ExchangeFactorValueObject({ value: factor }),
    );
  }
}
