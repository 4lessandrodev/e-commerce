import { Client, RegionId } from '@domain/aggregates-root';
import { Client as Schema } from '../entities/client.schema';
import { AddressMapper } from './address.mapper';
import { ClientMapper } from './client.mapper';
import { UniqueEntityID } from 'types-ddd/dist/src';
import { Address } from '@domain/entities';
import {
  AddressComplementValueObject,
  AddressNumberValueObject,
  ImageValueObject,
  StreetNameValueObject,
  UserNameValueObject,
  ZipCodeValueObject,
} from '@domain/value-objects';

describe('client.mapper', () => {
  //
  const currentDate = new Date();
  let schema: Schema;
  let domain: Client;
  //
  beforeAll(() => {
    //
    schema = {
      addresses: [
        {
          complement: 'valid_complement',
          createdAt: currentDate,
          id: 'valid_id',
          isMainAddress: true,
          number: '777',
          regionId: 'valid_region',
          street: 'valid_street',
          updatedAt: currentDate,
          zipCode: '75520140',
        },
      ],
      createdAt: currentDate,
      hasEcobag: true,
      id: 'valid_id',
      name: 'valid_name',
      updatedAt: currentDate,
      avatar: 'https://aws.s3.bucket/SDO65SD-SDFO.5/image.jpeg',
    };
    //
    domain = Client.create(
      {
        addresses: [
          Address.create(
            {
              complement: AddressComplementValueObject.create(
                'valid_complement',
              ).getResult(),
              isMainAddress: true,
              number: AddressNumberValueObject.create('777').getResult(),
              regionId: RegionId.create(new UniqueEntityID('valid_region')),
              street: StreetNameValueObject.create('valid_street').getResult(),
              zipCode: ZipCodeValueObject.create('75520140').getResult(),
              createdAt: currentDate,
              updatedAt: currentDate,
            },
            new UniqueEntityID('valid_id'),
          ).getResult(),
        ],
        hasEcobag: schema.hasEcobag,
        name: UserNameValueObject.create('valid_name').getResult(),
        createdAt: currentDate,
        avatar: ImageValueObject.create(
          'https://aws.s3.bucket/SDO65SD-SDFO.5/image.jpeg',
        ).getResult(),
        updatedAt: currentDate,
      },
      new UniqueEntityID('valid_id'),
    ).getResult();
    //
  });

  it('should be defined', () => {
    const addressMapper = new AddressMapper();
    const mapper = new ClientMapper(addressMapper);

    expect(mapper).toBeDefined();
  });

  it('should convert from persistence to domain', () => {
    const addressMapper = new AddressMapper();
    const mapper = new ClientMapper(addressMapper);
    const result = mapper.toDomain(schema);
    const isEqual = result.equals(domain);

    expect(isEqual).toBe(true);
  });

  it('should convert from domain to persistence', () => {
    const addressMapper = new AddressMapper();
    const mapper = new ClientMapper(addressMapper);
    const result = mapper.toPersistence(domain);

    expect(result).toEqual(schema);
  });
});
