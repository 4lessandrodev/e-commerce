/* import { Address } from './Address.domain-entity'; */

import {
  AddressComplement,
  AddressNumber,
  StreetName,
  ZipCodeValueObject,
} from '@domain/value-objects';
import { RegionId } from '@domain/aggregates-root';
import { Address } from './Address.domain-entity';

describe('Address.domain-entity', () => {
  it('should be defined', () => {
    const address = Address.create({
      complement: AddressComplement.create('valid_street').getResult(),
      isMainAddress: true,
      number: AddressNumber.create('7').getResult(),
      region: RegionId.create(),
      street: StreetName.create('valid_street').getResult(),
      zipCode: ZipCodeValueObject.create('75520140').getResult(),
    });
    expect(address).toBeDefined();
    expect(address.isSuccess).toBe(true);
  });
});
