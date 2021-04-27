import { BaseDomainEntity } from 'types-ddd';

export interface BasketCategoryProps extends BaseDomainEntity {
  description: string;
  changesLimit: number;
}
