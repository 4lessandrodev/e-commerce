import {
  ERROR_REGION_DESCRIPTION_LENGTH,
  ERROR_FREIGHT_PRICE_FOR_REGION,
} from './region-errors.domain';
import { AggregateRoot, Result, UniqueEntityID } from 'types-ddd';
import { validateStringLengthBetweenMaxAndMin } from '../../utils';
import { MonetaryValueObject } from '@domain/value-objects';
import { RegionProps } from './region.domain-aggregate-root-interface';
import { City } from '@domain/entities';
export const MAX_REGION_DESCRIPTION_LENGTH = 20;
export const MIN_REGION_DESCRIPTION_LENGTH = 3;

export class Region extends AggregateRoot<RegionProps> {
  private constructor(props: RegionProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get description(): string {
    return this.props.description.toLowerCase();
  }

  get freightPrice(): MonetaryValueObject {
    return this.props.freightPrice;
  }

  get isActive(): boolean {
    return this.props.isActive ?? true;
  }

  get city(): City {
    return this.props.city;
  }

  deactivate(): void {
    this.props.updatedAt = new Date();
    this.props.isActive = false;
  }

  activate(): void {
    this.props.updatedAt = new Date();
    this.props.isActive = true;
  }

  public static create(
    props: RegionProps,
    id?: UniqueEntityID,
  ): Result<Region> {
    const isValidDescriptionLength = validateStringLengthBetweenMaxAndMin({
      text: props.description,
      maxLength: MAX_REGION_DESCRIPTION_LENGTH,
      minLength: MIN_REGION_DESCRIPTION_LENGTH,
    });
    if (!isValidDescriptionLength) {
      return Result.fail<Region>(ERROR_REGION_DESCRIPTION_LENGTH);
    }
    if (!props.freightPrice.isPositive()) {
      return Result.fail<Region>(ERROR_FREIGHT_PRICE_FOR_REGION);
    }
    return Result.ok<Region>(new Region(props, id));
  }
}
