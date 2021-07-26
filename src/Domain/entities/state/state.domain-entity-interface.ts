import { BaseDomainEntity } from 'types-ddd';
import { AvailableInitials } from '@domain/value-objects';

export interface StateProps extends BaseDomainEntity {
	description: string;
	initial: keyof typeof AvailableInitials;
}
