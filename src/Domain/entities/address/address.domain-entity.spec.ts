/* import { Address } from './Address.domain-entity'; */

import {
  AddressComplementValueObject,
  AddressNumberValueObject,
  StreetNameValueObject,
  ZipCodeValueObject,
} from '@domain/value-objects';
import { RegionId } from '@domain/aggregates-root';
import { Address } from './address.domain-entity';

describe('Address.domain-entity', () => {
  it('should be defined', () => {
    const address = Address.create({
      complement:
        AddressComplementValueObject.create('valid_street').getResult(),
      isMainAddress: true,
      number: AddressNumberValueObject.create('7').getResult(),
      regionId: RegionId.create(),
      street: StreetNameValueObject.create('valid_street').getResult(),
      zipCode: ZipCodeValueObject.create('75520140').getResult(),
    });
    expect(address).toBeDefined();
    expect(address.isSuccess).toBe(true);
  });
});
