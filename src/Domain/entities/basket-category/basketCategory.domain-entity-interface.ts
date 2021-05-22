import { BaseDomainEntity } from 'types-ddd';
import { ChangesLimitValueObject } from '@domain/value-objects';

export interface BasketCategoryProps extends BaseDomainEntity {
  description: string;
  changesLimit: ChangesLimitValueObject;
}
