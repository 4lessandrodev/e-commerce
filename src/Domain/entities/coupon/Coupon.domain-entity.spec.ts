import { Result, UniqueEntityID } from 'types-ddd';
import { Coupon } from './Coupon.domain-entity';
import { CouponProps } from './Coupon.domain-entity-interface';
import { addDays } from 'date-fns';
import {
  ERROR_COUPON_EXPIRATION_RANGE_DAY,
  ERROR_COUPON_LENGTH_CODE_DESCRIPTION,
  ERROR_COUPON_LENGTH_DESCRIPTION,
  ERROR_COUPON_MIN_VALUE,
  ERROR_COUPON_PERCENTAGE_INVALID_RANGE,
} from './CouponErrors.domain-entity';
import { CouponId } from './CouponId.domain-entity';

describe('Coupon.domain-entity', () => {
  const makeSut = (
    props?: CouponProps,
    id?: UniqueEntityID,
  ): Result<Coupon> => {
    const validDate = addDays(new Date(), 3);
    return Coupon.create(
      {
        code: props?.code ?? 'BLACKFRIDAY2020',
        description: props?.description ?? 'Cupom Black Friday 2020',
        discount: props?.discount ?? 50,
        isActive: props?.isActive ?? true,
        isPercentage: props?.isPercentage ?? true,
        expiresAt: props?.expiresAt ?? validDate,
        quantityAvaliable: props?.quantityAvaliable ?? 100,
      },
      id,
    );
  };

  it('Should create a valid coupon', () => {
    const validCreatedCoupon = makeSut();
    expect(validCreatedCoupon.getResult().description).toBe(
      'Cupom Black Friday 2020',
    );
    expect(validCreatedCoupon.getResult().code).toBe('BLACKFRIDAY2020');
    expect(validCreatedCoupon.getResult().discount).toBe(50);
    expect(validCreatedCoupon.getResult().isActive).toBe(true);
    expect(validCreatedCoupon.getResult().isPercentage).toBe(true);
    expect(validCreatedCoupon.getResult().quantityAvaliable).toBe(100);
  });

  it('Should create a valid active coupon and deactivate it and reactivate it', () => {
    const validCreatedCoupon = makeSut();
    expect(validCreatedCoupon.getResult().isActive).toBe(true);
    validCreatedCoupon.getResult().deactivate();
    expect(validCreatedCoupon.getResult().isActive).toBe(false);
    validCreatedCoupon.getResult().activate();
    expect(validCreatedCoupon.getResult().isActive).toBe(true);
  });

  it('Should create a valid coupon and update a expiration date with success', () => {
    const validCreatedCoupon = makeSut();
    const validDate = addDays(new Date(), 7);
    expect(validCreatedCoupon.getResult().isActive).toBe(true);
    const success = validCreatedCoupon
      .getResult()
      .updateExpirationDate(validDate);
    expect(success.isSuccess).toBe(true);
    expect(validCreatedCoupon.getResult().expiresAt).toBe(validDate);
  });

  it('Should create a valid coupon and fail on update a expiration date with invalid date', () => {
    const validCreatedCoupon = makeSut();
    expect(validCreatedCoupon.getResult().isActive).toBe(true);
    const Fail = validCreatedCoupon
      .getResult()
      .updateExpirationDate(new Date());
    expect(Fail.isFailure).toBe(true);
    expect(Fail.error).toBe(ERROR_COUPON_EXPIRATION_RANGE_DAY);
  });

  it('Should fail if provide a long description to coupon', () => {
    const validCreatedCoupon = makeSut({
      description: 'Long_description_to_test_failure_coupon_description',
      code: 'ValidCode',
      discount: 10,
      expiresAt: new Date(),
      isActive: true,
      isPercentage: true,
      quantityAvaliable: 20,
    });
    expect(validCreatedCoupon.isFailure).toBe(true);
    expect(validCreatedCoupon.error).toBe(ERROR_COUPON_LENGTH_DESCRIPTION);
  });

  it('Should fail if provide a long code description to coupon', () => {
    const validCreatedCoupon = makeSut({
      description: 'Valid Description',
      code: 'LONG_COUPON_CODE_DESCRIPTION_TE_TEST_FAILURE',
      discount: 10,
      expiresAt: new Date(),
      isActive: true,
      isPercentage: true,
      quantityAvaliable: 20,
    });
    expect(validCreatedCoupon.isFailure).toBe(true);
    expect(validCreatedCoupon.error).toBe(ERROR_COUPON_LENGTH_CODE_DESCRIPTION);
  });

  it('Should fail if provide a value greatter than 100 when percentage', () => {
    const validCreatedCoupon = makeSut({
      description: 'Valid Description',
      code: 'VALID_CODE2020',
      discount: 110,
      expiresAt: new Date(),
      isActive: true,
      isPercentage: true,
      quantityAvaliable: 20,
    });
    expect(validCreatedCoupon.isFailure).toBe(true);
    expect(validCreatedCoupon.error).toBe(
      ERROR_COUPON_PERCENTAGE_INVALID_RANGE,
    );
  });

  it('Should create a coupon with the same id if provided', () => {
    const createdId = CouponId.create().id;
    const validCreatedCoupon = makeSut(
      {
        description: 'Valid Description',
        code: 'VALID_CODE2020',
        discount: 100,
        expiresAt: new Date(),
        isActive: true,
        isPercentage: true,
        quantityAvaliable: 20,
      },
      createdId,
    );
    expect(validCreatedCoupon.isSuccess).toBe(true);
    expect(validCreatedCoupon.getResult().id.toString()).toBe(
      createdId.toString(),
    );
  });

  it('Should create a valid coupon with descount greatter than 100 if not percentage', () => {
    const validCreatedCoupon = makeSut({
      description: 'Valid Description',
      code: 'VALID_CODE2020',
      discount: 110,
      expiresAt: new Date(),
      isActive: true,
      isPercentage: false,
      quantityAvaliable: 20,
    });
    expect(validCreatedCoupon.isSuccess).toBe(true);
    expect(validCreatedCoupon.getResult().isPercentage).toBe(false);
    expect(validCreatedCoupon.getResult().discount).toBe(110);
  });

  it('Should fail if provide a value less than min value (1)', () => {
    const validCreatedCoupon = makeSut({
      description: 'Valid Description',
      code: 'VALID_CODE2020',
      discount: 0,
      expiresAt: new Date(),
      isActive: true,
      isPercentage: false,
      quantityAvaliable: 20,
    });
    expect(validCreatedCoupon.isFailure).toBe(true);
    expect(validCreatedCoupon.error).toBe(ERROR_COUPON_MIN_VALUE);
  });
});
