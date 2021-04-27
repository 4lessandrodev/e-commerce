import { BaseDomainEntity } from 'types-ddd';
import { MonetaryValueObject } from '../../value-objects';

export interface RegionProps extends BaseDomainEntity {
  description: string;
  freightPrice: MonetaryValueObject;
  geoCode?: number;
  isActive?: boolean;
}
