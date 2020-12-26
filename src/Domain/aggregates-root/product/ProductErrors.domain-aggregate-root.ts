import {
  MAX_DESCRIPTION_LENGTH,
  MIN_DESCRIPTION_LENGTH,
} from './Product.domain-aggregate-root';
export const ERROR_PRODUCT_DESCRIPTION_LENGTH = `Product Description length Should be between ${MIN_DESCRIPTION_LENGTH} and ${MAX_DESCRIPTION_LENGTH}`;
export const ERROR_PRODUCT_AVALIABLE_QUANTITY =
  'Product Avaliable Quantity Should be greatter or equal to 0';
export const ERROR_PRODUCT_PRICE =
  'Product Price Should be greatter or equal to 0';
