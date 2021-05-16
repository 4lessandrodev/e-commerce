import { BaseDomainEntity } from 'types-ddd';
import { City } from '@domain/entities';
import { MonetaryValueObject } from '@domain/value-objects';

export interface RegionProps extends BaseDomainEntity {
  description: string;
  freightPrice: MonetaryValueObject;
  city: City;
  isActive: boolean;
}
