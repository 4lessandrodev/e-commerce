import { BaseDomainEntity } from 'types-ddd';
import { StateId } from '../state/StateId.domain-entity';

export interface CityProps extends BaseDomainEntity {
  stateId: StateId;
  name: string;
}
