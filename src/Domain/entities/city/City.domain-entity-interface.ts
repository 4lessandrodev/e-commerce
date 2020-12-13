import { BaseDomainEntity } from '../../../Shared';
import { StateId } from '../state/StateId.domain-entity';

export interface CityProps extends BaseDomainEntity {
  stateId: StateId;
  name: string;
}
