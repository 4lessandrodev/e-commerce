import {
  MAX_BASKET_DESCRIPTION_LENGTH,
  MIN_BASKET_DESCRIPTION_LENGTH,
} from '..';

export const ERROR_BASKET_DESCRIPTION_LENGTH = `Basket Description Length Should be between ${MIN_BASKET_DESCRIPTION_LENGTH} and ${MAX_BASKET_DESCRIPTION_LENGTH}`;
export const ERROR_BASKET_PRICE =
  'Basket Price Should be greater or equal to 0';
export const ERROR_BASKET_INFO_MAX_LENGTH = `Basket info length must be have less than ${MAX_BASKET_DESCRIPTION_LENGTH} characters`;
