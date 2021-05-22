import { Region as Schema } from '../entities/region.schema';
import { CityMapper } from './city.mapper';
import { RegionMapper } from './region.mapper';
import { Region } from '@domain/aggregates-root';
import { City } from '@domain/entities';
import {
  Currency,
  InitialStateValueObject,
  MonetaryValueObject,
} from '@domain/value-objects';
import { UniqueEntityID } from 'types-ddd/dist/src';

describe('region.mapper', () => {
  const currentDate = new Date();
  //
  let persistence: Schema;
  let domain: Region;
  //
  beforeAll(() => {
    persistence = {
      id: 'valid_id',
      description: 'valid_description',
      freightPrice: {
        locale: 'pt-BR',
        symbol: 'BRL',
        value: 200,
      },
      isActive: true,
      city: {
        id: 'valid_id',
        name: 'valid_name',
        stateInitial: 'RJ',
        geoCode: 960,
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      createdAt: currentDate,
      updatedAt: currentDate,
    };
    domain = Region.create(
      {
        description: 'valid_description',
        freightPrice: MonetaryValueObject.create(
          Currency.create(200).getResult(),
        ).getResult(),
        isActive: true,
        createdAt: currentDate,
        updatedAt: currentDate,
        city: City.create(
          {
            geoCode: 960,
            name: 'valid_name',
            stateInitial: InitialStateValueObject.create('RJ').getResult(),
            createdAt: currentDate,
            updatedAt: currentDate,
          },
          new UniqueEntityID('valid_id'),
        ).getResult(),
      },
      new UniqueEntityID('valid_id'),
    ).getResult();
  });

  it('should be defined', () => {
    const cityMapper = new CityMapper();
    const mapper = new RegionMapper(cityMapper);

    expect(mapper).toBeDefined();
  });

  it('should convert from domain to persistence', () => {
    const cityMapper = new CityMapper();
    const mapper = new RegionMapper(cityMapper);
    const result = mapper.toPersistence(domain);

    expect(result).toEqual(persistence);
  });

  it('should convert from persistence to domain', () => {
    const cityMapper = new CityMapper();
    const mapper = new RegionMapper(cityMapper);
    const result = mapper.toDomain(persistence);

    expect(result).toEqual(domain);
  });
});
