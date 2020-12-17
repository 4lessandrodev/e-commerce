import { BaseDomainEntity } from '../../../Shared';

export interface CouponProps extends BaseDomainEntity {
  description: string;
  quantityAvaliable: number;
  code: string;
  isActive: boolean;
  expiresAt: Date;
  isPercentage: boolean;
  discount: number;
}
