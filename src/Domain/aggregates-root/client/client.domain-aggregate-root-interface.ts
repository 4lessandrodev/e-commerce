import { BaseDomainEntity } from 'types-ddd';
import { ImageValueObject, UserNameValueObject } from '@domain/value-objects';
import { Address } from '@domain/entities';

export interface ClientProps extends BaseDomainEntity {
	name: UserNameValueObject;
	avatar?: ImageValueObject;
	hasEcobag: boolean;
	addresses: Address[];
}
