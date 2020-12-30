import { Result, UniqueEntityID } from '../../../Shared';
import { MonetaryValueObject } from '../../value-objects';
import { Currency } from '../../value-objects/monetary/Currency.value-object';
import { Region } from './Region.domain-entity';
import { RegionProps } from './Region.domain-entity-interface';
import { ERROR_REGION_DESCRIPTION_LENGTH } from './RegionErrors.domain-entity';
import { RegionId } from './RegionId.domain-entity';

describe('Region.domain-entity', () => {
  const makePrice = (value: number): Currency => {
    return Currency.create({
      locale: 'BR',
      simbol: 'BRL',
      value,
    }).getResult();
  };
  const makeSut = (
    props?: RegionProps,
    id?: UniqueEntityID,
  ): Result<Region> => {
    return Region.create(
      {
        description: props?.description ?? 'Valid Description',
        freigthPrice:
          props?.freigthPrice ??
          MonetaryValueObject.create(makePrice(10)).getResult(),
        geoCode: props?.geoCode,
        isActive: props?.isActive,
      },
      id,
    );
  };

  it('Should create a valid region ', () => {
    const regionCreated = makeSut();
    expect(regionCreated.isFailure).toBe(false);
    expect(regionCreated.getResult().description).toBe('Valid Description');
    expect(regionCreated.getResult().id).not.toBeUndefined();
    expect(regionCreated.getResult().id).not.toBeNull();
    expect(regionCreated.getResult().isActive).toBe(true);
    expect(regionCreated.getResult().freigthPrice.value).toBe(10);
    expect(regionCreated.getResult().geoCode).toBe(0);
    expect(regionCreated.getResult().isDeleted).toBe(false);
  });

  it('Should deactivate with success a region ', () => {
    const regionCreated = makeSut().getResult();
    expect(regionCreated.isActive).toBe(true);
    expect(regionCreated.isDeleted).toBe(false);
    regionCreated.deactivate();
    expect(regionCreated.isActive).toBe(false);
    expect(regionCreated.isDeleted).toBe(false);
  });

  it('Should active with success a region ', () => {
    const regionCreated = makeSut({
      description: 'Valid description',
      freigthPrice: MonetaryValueObject.create(makePrice(11)).getResult(),
      isActive: false,
    }).getResult();
    expect(regionCreated.isActive).toBe(false);
    expect(regionCreated.isDeleted).toBe(false);
    regionCreated.activate();
    expect(regionCreated.isActive).toBe(true);
    expect(regionCreated.isDeleted).toBe(false);
  });

  it('Should active with success a region ', () => {
    const createdId = RegionId.create().id;
    const regionCreated = makeSut(
      {
        description: 'Valid description',
        freigthPrice: MonetaryValueObject.create(makePrice(11)).getResult(),
      },
      createdId,
    ).getResult();
    expect(regionCreated.id.toString()).toBe(createdId.toString());
  });

  it('Should fail if provide a short description ', () => {
    const regionResult = makeSut({
      description: 'a',
      freigthPrice: MonetaryValueObject.create(makePrice(15)).getResult(),
    });
    expect(regionResult.isFailure).toBe(true);
    expect(regionResult.error).toBe(ERROR_REGION_DESCRIPTION_LENGTH);
  });

  it('Should fail if provide a long description ', () => {
    const regionResult = makeSut({
      description:
        'this_is_a_long_region_description_to_validate_max_length_description_error',
      freigthPrice: MonetaryValueObject.create(makePrice(15)).getResult(),
    });
    expect(regionResult.isFailure).toBe(true);
    expect(regionResult.error).toBe(ERROR_REGION_DESCRIPTION_LENGTH);
  });
});
