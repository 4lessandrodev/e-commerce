import { BaseDomainEntity } from 'types-ddd';
import { RegionId } from '@domain/aggregates-root';
import { ZipCodeValueObject } from '@domain/value-objects';
import { StreetName } from '@domain/value-objects';
import { AddressComplement } from '@domain/value-objects';
import { AddressNumber } from '@domain/value-objects';

export interface AddressProps extends BaseDomainEntity {
  zipCode: ZipCodeValueObject;
  street: StreetName;
  number: AddressNumber;
  complement: AddressComplement;
  isMainAddress: boolean;
  region: RegionId;
}
