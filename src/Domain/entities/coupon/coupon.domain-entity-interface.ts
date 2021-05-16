import { BaseDomainEntity } from 'types-ddd';

export interface CouponProps extends BaseDomainEntity {
  description: string;
  quantityAvailable: number;
  code: string;
  isActive: boolean;
  expiresAt: Date;
  isPercentage: boolean;
  discount: number;
}
