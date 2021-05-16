import { IBaseRepository } from 'types-ddd';
import { Basket } from '@domain/aggregates-root';

export interface BasketRepositoryInterface extends IBaseRepository<Basket> {
  deactivateAllBaskets: () => Promise<void>;
}
