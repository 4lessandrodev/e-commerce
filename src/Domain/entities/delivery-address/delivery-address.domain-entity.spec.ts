import { AddressComplementValueObject } from '@domain/value-objects';
import { AddressNumberValueObject } from '@domain/value-objects';
import { StreetNameValueObject } from '@domain/value-objects';
import { ZipCodeValueObject } from '@domain/value-objects';
import { RegionId } from '../../aggregates-root';
import { DeliveryOrCollectionAddress } from './delivery-address.domain-entity';

describe('delivery-address.value-object', () => {
  it('should create a valid address', () => {
    const address = DeliveryOrCollectionAddress.create({
      complement:
        AddressComplementValueObject.create('valid_street').getResult(),
      number: AddressNumberValueObject.create('77b').getResult(),
      regionId: RegionId.create(),
      street: StreetNameValueObject.create('valid_street').getResult(),
      zipCode: ZipCodeValueObject.create('75520104').getResult(),
    });

    expect(address.isSuccess).toBe(true);
  });
});
