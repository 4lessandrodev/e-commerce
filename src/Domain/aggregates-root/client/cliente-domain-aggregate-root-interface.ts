import { BaseDomainEntity } from 'types-ddd/dist/src';
import { CityId, RegionId, StateId } from '@domain/entities';

export interface ClientProps extends BaseDomainEntity {
  address: {
    street: string;
    region: RegionId;
    state: StateId;
    city: CityId;
    number: string;
    zip: string;
  };
  subscriptions: string[];
  orders: string[];
}
