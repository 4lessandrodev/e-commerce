import { Entity } from '../../../Shared/Entity';
import { Result } from '../../../Shared/Result';
import { UniqueEntityID } from '../../../Shared/UniqueEntityID';
import { validateStringLengthBetweenMaxAndMin } from '../../utils/validate-string-length.domain.util';
import { StateId } from '../state/StateId.domain-entity';
import { ERROR_CITY_LENGTH_NAME } from './CityErrors.domain.entity';
export const CITY_NAME_MAX_STRING_LENGTH = 50;
export const CITY_NAME_MIN_STRING_LENGTH = 3;

interface CityProps {
  stateId: StateId;
  name: string;
}

export class City extends Entity<CityProps> {
  private constructor(props: CityProps, id?: UniqueEntityID) {
    super(props, id);
  }

  getName(): string {
    return this.props.name;
  }

  public static create(props: CityProps, id?: UniqueEntityID): Result<City> {
    const isValidName = validateStringLengthBetweenMaxAndMin(
      props.name,
      CITY_NAME_MAX_STRING_LENGTH,
      CITY_NAME_MIN_STRING_LENGTH,
    );
    if (!props.name || !isValidName) {
      return Result.fail<City>(ERROR_CITY_LENGTH_NAME);
    }
    return Result.ok<City>(new City(props, id));
  }
}
