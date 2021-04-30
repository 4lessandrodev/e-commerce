import { BaseDomainEntity } from 'types-ddd';
import { UserId } from '../user/UserId.domain-aggregate-root';
import { ImageValueObject } from '@domain/value-objects';
import { Address } from '@domain/entities';
import { RegionName } from '@domain/value-objects';

export interface ClientProps extends BaseDomainEntity {
  id: UserId;
  name: RegionName;
  avatar: ImageValueObject;
  hasEcobag: boolean;
  addresses: Address[];
}
