import { IBaseRepository } from 'types-ddd';
import { Product } from '@domain/aggregates-root';
export interface ProductRepositoryInterface extends IBaseRepository<Product> {
  findProductsByIds: (ids: string[]) => Promise<Product[] | null>;
  deactivateManyProducts: (ids?: string[]) => Promise<void>;
  resetStock: (ids?: string[]) => Promise<void>;
  findAllProductsOrFilteredByIds: (ids?: string[]) => Promise<Product[] | null>;
}
