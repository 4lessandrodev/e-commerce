import { BaseDomainEntity } from 'types-ddd';

export interface DeliveryStatusProps extends BaseDomainEntity {
  description: string;
  info?: string;
  isActive?: boolean;
}
