import { BaseDomainEntity } from '../../../Shared';

export interface BasketCategoryProps extends BaseDomainEntity {
  description: string;
  changesLimit: number;
}
