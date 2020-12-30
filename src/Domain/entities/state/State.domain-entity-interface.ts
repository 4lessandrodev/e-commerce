import { BaseDomainEntity } from '../../../Shared';
import { AvaliableInitials } from '../../value-objects';

export interface StateProps extends BaseDomainEntity {
  description: string;
  initial: keyof typeof AvaliableInitials;
}
