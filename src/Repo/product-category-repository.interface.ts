import { Filter } from 'types-ddd';
import { ProductCategory } from '@domain/entities';

export interface ProductCategoryRepositoryInterface {
  exists: (filter: Filter) => Promise<boolean>;
  save: (target: ProductCategory) => Promise<void>;
  delete: (filter: Filter) => Promise<void>;
  findOne: (filter: Filter) => Promise<ProductCategory | null>;
}
