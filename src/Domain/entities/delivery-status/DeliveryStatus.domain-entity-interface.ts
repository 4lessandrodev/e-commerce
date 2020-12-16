import { BaseDomainEntity } from '../../../Shared';

export interface DeliveryStatusProps extends BaseDomainEntity {
  description: string;
  info?: string;
  isActive?: boolean;
}
