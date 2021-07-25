import { Result, ValueObject } from 'types-ddd';
import { ERROR_INVALID_ENUM_FOR_UNIT_OF_MEASUREMENT } from './unit-of-measurement-errors.domain';

export enum Units {
	'KG',
	'LT',
	'UN',
	'MT',
	'CX',
	'PC'
}

export type UnitTypes = keyof typeof Units;

export interface UnitOfMeasurementProps {
	value: UnitTypes;
}

export class UnitOfMeasurementValueObject extends ValueObject<UnitOfMeasurementProps> {
	private constructor(props: UnitOfMeasurementProps) {
		super(props);
	}

	get value(): UnitTypes {
		return this.props.value.toUpperCase() as UnitTypes;
	}

	public static create(
		unit: UnitTypes
	): Result<UnitOfMeasurementValueObject> {
		const isValidUnit = Object.values(Units).includes(unit.toUpperCase());
		if (!isValidUnit) {
			return Result.fail<UnitOfMeasurementValueObject>(
				ERROR_INVALID_ENUM_FOR_UNIT_OF_MEASUREMENT
			);
		}
		return Result.ok<UnitOfMeasurementValueObject>(
			new UnitOfMeasurementValueObject({ value: unit })
		);
	}
}
