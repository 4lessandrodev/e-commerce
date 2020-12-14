import { BaseDomainEntity } from '../../../Shared';
import { MonetaryValueObject } from '../../value-objects';

export interface RegionProps extends BaseDomainEntity {
  description: string;
  freigthPrice: MonetaryValueObject;
  geoCode?: number;
  isActive?: boolean;
}
