import { Address } from '@domain/entities';
import { DomainId } from 'types-ddd/dist/src';
import { RegionId } from '@domain/aggregates-root';
import { Client } from './client.domain-aggregate-root';
import {
  AddressComplementValueObject,
  AddressNumberValueObject,
  ImageValueObject,
  RegionNameValueObject,
  StreetNameValueObject,
  ZipCodeValueObject,
} from '@domain/value-objects';

describe('cliente-domain-aggregate-root', () => {
  it('should be defined', () => {
    const client = Client.create(
      {
        addresses: [
          Address.create({
            complement: AddressComplementValueObject.create(
              'complement street',
            ).getResult(),
            isMainAddress: true,
            number: AddressNumberValueObject.create('777').getResult(),
            regionId: RegionId.create(),
            street: StreetNameValueObject.create('valid street').getResult(),
            zipCode: ZipCodeValueObject.create('75520140').getResult(),
          }).getResult(),
        ],
        avatar: ImageValueObject.create(
          'http://aws.s3.bucket/LIOEWR-5S65DF0/image.jpeg',
        ).getResult(),
        hasEcobag: true,
        name: RegionNameValueObject.create('valid region name').getResult(),
      },
      DomainId.create().id,
    );
    expect(client.isSuccess).toBe(true);
  });
});
