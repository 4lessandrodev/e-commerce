import { Filter } from 'types-ddd';
import { BasketCategory } from '@domain/entities';

export interface BasketCategoryRepositoryInterface {
  exists: (filter: Filter) => Promise<boolean>;
  save: (target: BasketCategory) => Promise<void>;
  delete: (filter: Filter) => Promise<void>;
  findOne: (filter: Filter) => Promise<BasketCategory | null>;
}
