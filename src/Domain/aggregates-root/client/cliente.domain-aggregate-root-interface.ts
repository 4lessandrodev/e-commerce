import { BaseDomainEntity } from 'types-ddd/dist/src';
import { CityId, RegionId, StateId } from '@domain/entities';
import { UserId } from '../user/UserId.domain-aggregate-root';
import { AvailableInitials } from '@domain/value-objects';

export interface ClientProps extends BaseDomainEntity {
  userId: UserId;
  address: {
    street: string;
    region: {
      id: RegionId;
      geoCode: number;
      description: string;
    };
    city: {
      id: CityId;
      name: string;
      stateId: StateId;
      state: keyof typeof AvailableInitials;
    };
    complement: string;
    number: string;
    zone: string;
    zipCode: string;
  };
}
