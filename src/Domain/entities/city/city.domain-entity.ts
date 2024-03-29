import { Entity, Result, UniqueEntityID } from 'types-ddd';
import { validateStringLengthBetweenMaxAndMin } from '@domain/utils/validate-string-length.domain.util';
import { InitialStateValueObject } from '@domain/value-objects';
import { CityProps } from './city.domain-entity.interface';
import { ERROR_CITY_LENGTH_NAME } from './city-errors.domain-entity';
export const MAX_CITY_NAME_LENGTH = 50;
export const MIN_CITY_NAME_MIN_LENGTH = 3;

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

	get geoCode(): number {
		return this.props.geoCode;
	}

	get stateInitial(): InitialStateValueObject {
		return this.props.stateInitial;
	}

	public static create(props: CityProps, id?: UniqueEntityID): Result<City> {
		const isValidName = validateStringLengthBetweenMaxAndMin({
			text: props.name,
			maxLength: MAX_CITY_NAME_LENGTH,
			minLength: MIN_CITY_NAME_MIN_LENGTH
		});
		if (!props.name || !isValidName) {
			return Result.fail<City>(ERROR_CITY_LENGTH_NAME);
		}
		return Result.ok<City>(new City(props, id));
	}
}
