import { UniqueEntityID } from '../../../Shared';
import { StateId } from '../state/StateId.domain-entity';
import { City, CityProps } from './City.domain-entity';
import { ERROR_CITY_LENGTH_NAME } from './CityErrors.domain-entity';
import { CityId } from './CityId.domain-entity';

describe('City.domain-entity', () => {
  const makeSut = (props?: CityProps, id?: UniqueEntityID) => {
    return City.create(
      {
        name: props?.name ?? 'Santa Catarina',
        stateId: props?.stateId ?? StateId.create(),
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
    const validCity = makeSut({ name: '', stateId: StateId.create() });
    expect(validCity.isFailure).toBe(true);
    expect(validCity.errorValue()).toBe(ERROR_CITY_LENGTH_NAME);
  });

  it('Should fail if provide a city name length less than required', () => {
    const validCity = makeSut({ name: 'a', stateId: StateId.create() });
    expect(validCity.isFailure).toBe(true);
    expect(validCity.errorValue()).toBe(ERROR_CITY_LENGTH_NAME);
  });

  it('Should fail if provide a city name length more than max permited', () => {
    const validCity = City.create({
      name: 'this-is-a-long-city-invalid-name-to-check-the-validation',
      stateId: StateId.create(),
    });
    expect(validCity.isFailure).toBe(true);
    expect(validCity.errorValue()).toBe(ERROR_CITY_LENGTH_NAME);
  });

  it('Should return the same id if provided', () => {
    const createdId = CityId.create().id;
    const validCity = City.create(
      { name: 'Valid name', stateId: StateId.create() },
      createdId,
    );
    expect(validCity.isFailure).toBe(false);
    expect(validCity.getResult().id.toString()).toBe(createdId.toString());
  });
});
