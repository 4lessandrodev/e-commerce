import { UniqueEntityID } from 'types-ddd';
import { InitialStateValueObject } from '../../value-objects';
import { StateId } from '../state/StateId.domain-entity';
import { City } from './City.domain-entity';
import { CityProps } from './City.domain-entity-interface';
import { ERROR_CITY_LENGTH_NAME } from './CityErrors.domain-entity';
import { CityId } from './CityId.domain-entity';

describe('City.domain-entity', () => {
  const makeSut = (props?: CityProps, id?: UniqueEntityID) => {
    return City.create(
      {
        name: props?.name ?? 'Santa Catarina',
        stateId: props?.stateId ?? StateId.create(),
        geoCode: 0,
        stateInitial: InitialStateValueObject.create('RJ').getResult(),
      },
      id,
    );
  };

  it('Should create a valid city', () => {
    const validCity = makeSut();
    expect(validCity.isFailure).toBe(false);
    expect(validCity.getResult().name).toBe('Santa Catarina');
  });

  it('Should fail if not provide a city name', () => {
    const validCity = makeSut({
      name: '',
      stateId: StateId.create(),
      stateInitial: InitialStateValueObject.create('RJ').getResult(),
      geoCode: 0,
    });
    expect(validCity.isFailure).toBe(true);
    expect(validCity.errorValue()).toBe(ERROR_CITY_LENGTH_NAME);
  });

  it('Should fail if provide a city name length less than required', () => {
    const validCity = makeSut({
      name: 'a',
      stateId: StateId.create(),
      stateInitial: InitialStateValueObject.create('RJ').getResult(),
      geoCode: 0,
    });
    expect(validCity.isFailure).toBe(true);
    expect(validCity.errorValue()).toBe(ERROR_CITY_LENGTH_NAME);
  });

  it('Should fail if provide a city name length more than max permitted', () => {
    const validCity = City.create({
      name: 'this-is-a-long-city-invalid-name-to-check-the-validation',
      stateId: StateId.create(),
      stateInitial: InitialStateValueObject.create('RJ').getResult(),
      geoCode: 0,
    });
    expect(validCity.isFailure).toBe(true);
    expect(validCity.errorValue()).toBe(ERROR_CITY_LENGTH_NAME);
  });

  it('Should return the same id if provided', () => {
    const createdId = CityId.create().id;
    const validCity = City.create(
      {
        name: 'Valid name',
        stateId: StateId.create(),
        stateInitial: InitialStateValueObject.create('RJ').getResult(),
        geoCode: 0,
      },
      createdId,
    );
    expect(validCity.isFailure).toBe(false);
    expect(validCity.getResult().id.toString()).toBe(createdId.toString());
    expect(validCity.getResult().stateId).toBeDefined();
  });
});
