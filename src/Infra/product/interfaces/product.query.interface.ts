import { Product } from '../entities/product.schema';
import { ProductFilter } from './product.filters.interface';

export interface ProductQueryInterface {
  getProducts: (filter: ProductFilter) => Promise<Product[]>;
}
