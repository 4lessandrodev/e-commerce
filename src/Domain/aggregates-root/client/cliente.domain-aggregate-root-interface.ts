import { BaseDomainEntity } from 'types-ddd';
import { RegionId } from '@domain/entities';
import { UserId } from '../user/UserId.domain-aggregate-root';
import { ImageValueObject } from '@domain/value-objects';

export interface ClientProps extends BaseDomainEntity {
  id: UserId;
  name: string;
  avatar: ImageValueObject;
  hasEcobag: boolean;
  addresses: [
    {
      id: string;
      zipCode: string;
      street: string;
      number: string;
      complement: string;
      isMainAddress: boolean;
      region: RegionId;
    },
  ];
}
