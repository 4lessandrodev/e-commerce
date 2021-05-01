import { BaseDomainEntity } from 'types-ddd';
import { RegionId } from '@domain/aggregates-root';
import { ZipCodeValueObject } from '@domain/value-objects';
import { StreetNameValueObject } from '@domain/value-objects';
import { AddressComplementValueObject } from '@domain/value-objects';
import { AddressNumberValueObject } from '@domain/value-objects';

export interface AddressProps extends BaseDomainEntity {
  zipCode: ZipCodeValueObject;
  street: StreetNameValueObject;
  number: AddressNumberValueObject;
  complement: AddressComplementValueObject;
  isMainAddress: boolean;
  regionId: RegionId;
}
