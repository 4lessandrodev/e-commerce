import {
  MAX_EXCHANGE_FACTOR_VALUE,
  MIN_EXCHANGE_FACTOR_VALUE,
} from './exchange-factor.value-object';

export const ERROR_INVALID_EXCHANGE_FACTOR = `Invalid value for exchange factor, must be greater than ${MIN_EXCHANGE_FACTOR_VALUE} and less than ${MAX_EXCHANGE_FACTOR_VALUE}`;
