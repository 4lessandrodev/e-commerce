import { BaseDomainEntity } from 'types-ddd';
import { City } from '../../entities';
import { MonetaryValueObject } from '../../value-objects';

export interface RegionProps extends BaseDomainEntity {
  description: string;
  freightPrice: MonetaryValueObject;
  city: City;
  isActive?: boolean;
}
