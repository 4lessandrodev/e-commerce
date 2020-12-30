import { BaseDomainEntity } from '../../../Shared';
import { InitialStates } from '../../value-objects';

export interface StateProps extends BaseDomainEntity {
  description: string;
  initial: typeof InitialStates;
}
