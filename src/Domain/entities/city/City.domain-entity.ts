import { Entity, Result, UniqueEntityID } from '../../../Shared';
import { validateStringLengthBetweenMaxAndMin } from '../../utils/validate-string-length.domain.util';
import { CityProps } from './City.domain-entity-interface';
import { ERROR_CITY_LENGTH_NAME } from './CityErrors.domain-entity';
export const CITY_NAME_MAX_STRING_LENGTH = 50;
export const CITY_NAME_MIN_STRING_LENGTH = 3;

export class City extends Entity<CityProps> {
  private constructor(props: CityProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  get stateId(): UniqueEntityID {
    return this.props.stateId.id;
  }

  public static create(props: CityProps, id?: UniqueEntityID): Result<City> {
    const isValidName = validateStringLengthBetweenMaxAndMin({
      text: props.name,
      maxLength: CITY_NAME_MAX_STRING_LENGTH,
      minLength: CITY_NAME_MIN_STRING_LENGTH,
    });
    if (!props.name || !isValidName) {
      return Result.fail<City>(ERROR_CITY_LENGTH_NAME);
    }
    return Result.ok<City>(new City(props, id));
  }
}
