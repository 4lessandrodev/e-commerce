import { Product } from '../entities/product.schema';
import { ProductFilter } from './product.filters.interface';

export interface GetProductsResult {
  totalOfRegisters: number;
  products: Product[];
}
export interface ProductQueryInterface {
  getProducts: (filter: ProductFilter) => Promise<GetProductsResult>;
}
