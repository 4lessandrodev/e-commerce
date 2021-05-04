import {
  MAX_PRODUCT_DESCRIPTION_LENGTH,
  MIN_PRODUCT_DESCRIPTION_LENGTH,
} from './Product.domain-aggregate-root';
export const ERROR_PRODUCT_DESCRIPTION_LENGTH = `Product Description length Should be between ${MIN_PRODUCT_DESCRIPTION_LENGTH} and ${MAX_PRODUCT_DESCRIPTION_LENGTH}`;
export const ERROR_PRODUCT_AVAILABLE_QUANTITY =
  'Product Available Quantity Should be greater or equal to 0';
export const ERROR_PRODUCT_PRICE =
  'Product Price Should be greater or equal to 0';
