import { City } from '../entities/city.schema';

export interface CityQueryInterface {
  getCities: () => Promise<City[]>;
}
