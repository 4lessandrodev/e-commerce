import { BaseDomainEntity } from 'types-ddd';
import { InitialStateValueObject } from '../../value-objects';
import { StateId } from '../state/StateId.domain-entity';

export interface CityProps extends BaseDomainEntity {
  stateId: StateId;
  name: string;
  geoCode: number;
  stateInitial: InitialStateValueObject;
}
