import { Filter } from 'types-ddd';
import { City } from '@domain/entities';

export interface CityRepositoryInterface {
	exists: (filter: Filter) => Promise<boolean>;
	save: (target: City) => Promise<void>;
	delete: (filter: Filter) => Promise<void>;
	findOne: (filter: Filter) => Promise<City | null>;
}
