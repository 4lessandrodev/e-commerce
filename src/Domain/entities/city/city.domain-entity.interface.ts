import { BaseDomainEntity } from 'types-ddd';
import { InitialStateValueObject } from '@domain/value-objects';

export interface CityProps extends BaseDomainEntity {
	name: string;
	geoCode: number;
	stateInitial: InitialStateValueObject;
}
