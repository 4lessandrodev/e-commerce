import { BaseDomainEntity } from 'types-ddd';
import { AvaliableInitials } from '../../value-objects';

export interface StateProps extends BaseDomainEntity {
  description: string;
  initial: keyof typeof AvaliableInitials;
}
