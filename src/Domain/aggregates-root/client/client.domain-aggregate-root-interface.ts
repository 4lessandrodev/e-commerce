import { BaseDomainEntity } from 'types-ddd';
import { ImageValueObject } from '@domain/value-objects';
import { Address } from '@domain/entities';
import { UserNameValueObject } from '@domain/value-objects';

export interface ClientProps extends BaseDomainEntity {
  name: UserNameValueObject;
  avatar?: ImageValueObject;
  hasEcobag: boolean;
  addresses: Address[];
}
