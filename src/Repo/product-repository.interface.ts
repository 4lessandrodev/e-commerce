import { IBaseRepository } from 'types-ddd';
import { Product } from '@domain/aggregates-root';
export interface ProductRepositoryInterface extends IBaseRepository<Product> {
  findProductsByIds: (ids: string[]) => Promise<Product[]>;
}
