import { Result, ValueObject } from 'types-ddd';
import { validateStringLengthBetweenMaxAndMin } from '@domain/utils';
import { ERROR_REGION_NAME_LENGTH } from './RegionNameErrors.domain';
export const MIN_REGION_NAME_LENGTH = 1;
export const MAX_REGION_NAME_LENGTH = 20;

export interface RegionNameProps {
  value: string;
}

export class RegionName extends ValueObject<RegionNameProps> {
  private constructor(props: RegionNameProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(name: string): Result<RegionName> {
    const isValidStreetLength = validateStringLengthBetweenMaxAndMin({
      maxLength: MAX_REGION_NAME_LENGTH,
      minLength: MIN_REGION_NAME_LENGTH,
      text: name,
    });

    if (!isValidStreetLength) {
      return Result.fail<RegionName>(ERROR_REGION_NAME_LENGTH);
    }

    return Result.ok<RegionName>(new RegionName({ value: name }));
  }
}
