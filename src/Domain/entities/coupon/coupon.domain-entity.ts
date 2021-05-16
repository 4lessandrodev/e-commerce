import { Entity, Result, UniqueEntityID } from 'types-ddd';
import {
  getDifferenceInDaysFromDateAndCurrentDay,
  validateNumberBetweenMaxAndMin,
  validateStringLengthBetweenMaxAndMin,
} from '../../utils';
import { CouponProps } from './coupon.domain-entity-interface';
import {
  ERROR_COUPON_LENGTH_CODE_DESCRIPTION,
  ERROR_COUPON_LENGTH_DESCRIPTION,
  ERROR_COUPON_PERCENTAGE_INVALID_RANGE,
  ERROR_COUPON_EXPIRATION_RANGE_DAY,
  ERROR_COUPON_MIN_VALUE,
} from './coupon-errors.domain-entity';
export const COUPON_DESCRIPTION_MAX_STRING_LENGTH = 30;
export const COUPON_DESCRIPTION_MIN_STRING_LENGTH = 3;
export const COUPON_CODE_MAX_STRING_LENGTH = 20;
export const COUPON_CODE_MIN_STRING_LENGTH = 5;
export const COUPON_PERCENTAGE_MAX_VALUE = 100;
export const COUPON_PERCENTAGE_MIN_VALUE = 1;
export const COUPON_MIN_EXPIRATION_DATE_IN_DAYS = 1;
export const COUPON_MIN_VALUE = 1;

export class Coupon extends Entity<CouponProps> {
  private constructor(props: CouponProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get description(): string {
    return this.props.description;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get quantityAvaliable(): number {
    return this.props.quantityAvailable;
  }

  get isPercentage(): boolean {
    return this.props.isPercentage;
  }

  get discount(): number {
    return this.props.discount;
  }

  get code(): string {
    return this.props.code;
  }

  get expiresAt(): Date {
    return this.props.expiresAt;
  }

  deactivate(): void {
    (this.props.updatedAt = new Date()), (this.props.isActive = false);
  }

  activate(): void {
    (this.props.updatedAt = new Date()), (this.props.isActive = true);
  }

  updateExpirationDate(date: Date): Result<void> {
    const differenceInDays = getDifferenceInDaysFromDateAndCurrentDay(date);
    if (differenceInDays < COUPON_MIN_EXPIRATION_DATE_IN_DAYS) {
      return Result.fail<void>(ERROR_COUPON_EXPIRATION_RANGE_DAY);
    }
    (this.props.updatedAt = new Date()), (this.props.expiresAt = date);
    return Result.ok<void>();
  }

  public static create(
    props: CouponProps,
    id?: UniqueEntityID,
  ): Result<Coupon> {
    const isValidDescription = validateStringLengthBetweenMaxAndMin({
      text: props.description,
      maxLength: COUPON_DESCRIPTION_MAX_STRING_LENGTH,
      minLength: COUPON_DESCRIPTION_MIN_STRING_LENGTH,
    });

    if (!isValidDescription) {
      return Result.fail<Coupon>(ERROR_COUPON_LENGTH_DESCRIPTION);
    }

    const isValidCouponCode = validateStringLengthBetweenMaxAndMin({
      text: props.code,
      maxLength: COUPON_CODE_MAX_STRING_LENGTH,
      minLength: COUPON_CODE_MIN_STRING_LENGTH,
    });

    if (!isValidCouponCode) {
      return Result.fail<Coupon>(ERROR_COUPON_LENGTH_CODE_DESCRIPTION);
    }

    if (props.isPercentage) {
      const isValidRange = validateNumberBetweenMaxAndMin({
        value: props.discount,
        max: COUPON_PERCENTAGE_MAX_VALUE,
        min: COUPON_PERCENTAGE_MIN_VALUE,
      });
      if (!isValidRange) {
        return Result.fail<Coupon>(ERROR_COUPON_PERCENTAGE_INVALID_RANGE);
      }
    }

    if (props.discount < COUPON_MIN_VALUE) {
      return Result.fail<Coupon>(ERROR_COUPON_MIN_VALUE);
    }

    return Result.ok<Coupon>(new Coupon(props, id));
  }
}
