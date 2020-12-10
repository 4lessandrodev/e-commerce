import { StateId } from '../state/StateId.domain-entity';
import { City } from './City.domain-entity';
import { ERROR_CITY_LENGTH_NAME } from './CityErrors.domain-entity';

describe('City.domain-entity', () => {
  it('Should create a valid city', () => {
    const stateId = StateId.create();
    const validCity = City.create({ name: 'Santa Catarina', stateId });
    expect(validCity.isFailure).toBe(false);
    expect(validCity.getResult().name).toBe('Santa Catarina');
  });

  it('Should fail if not provide a city name', () => {
    const stateId = StateId.create();
    const validCity = City.create({ name: '', stateId });
    expect(validCity.isFailure).toBe(true);
    expect(validCity.errorValue()).toBe(ERROR_CITY_LENGTH_NAME);
  });

  it('Should fail if provide a city name length less than required', () => {
    const stateId = StateId.create();
    const validCity = City.create({ name: 'it', stateId });
    expect(validCity.isFailure).toBe(true);
    expect(validCity.errorValue()).toBe(ERROR_CITY_LENGTH_NAME);
  });

  it('Should fail if provide a city name length more than max permited', () => {
    const stateId = StateId.create();
    const validCity = City.create({
      name: 'this-is-a-long-city-invalid-name-to-check-the-validation',
      stateId,
    });
    expect(validCity.isFailure).toBe(true);
    expect(validCity.errorValue()).toBe(ERROR_CITY_LENGTH_NAME);
  });
});
