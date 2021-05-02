import { City } from '@domain/entities';
import { CityMapper } from './city.mapper';
import { City as Schema } from '../entities/city.schema';
import { UniqueEntityID } from 'types-ddd/dist/src';
import { InitialStateValueObject } from '../../../Domain/value-objects';

describe('city.mapper', () => {
  //
  const currentDate = new Date();
  let domain: City;
  let persistence: Schema;
  //
  beforeAll(() => {
    //
    domain = City.create(
      {
        name: 'valid_name',
        stateInitial: InitialStateValueObject.create('RJ').getResult(),
        geoCode: 960,
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      new UniqueEntityID('valid_id'),
    ).getResult();
    //
    persistence = {
      id: 'valid_id',
      name: 'valid_name',
      stateInitial: 'RJ',
      geoCode: 960,
      createdAt: currentDate,
      updatedAt: currentDate,
    };
  });

  it('should be defined', () => {
    const mapper = new CityMapper();
    expect(mapper).toBeDefined();
  });

  it('should convert from domain to persistence', () => {
    const mapper = new CityMapper();
    const result = mapper.toPersistence(domain);
    expect(result).toEqual(persistence);
  });

  it('should convert from persistence to domain', () => {
    const mapper = new CityMapper();
    const result = mapper.toDomain(persistence);
    expect(result).toEqual(domain);
  });
});
