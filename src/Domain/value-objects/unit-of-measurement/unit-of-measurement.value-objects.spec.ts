import { UnitOfMeasurementValueObject } from './unit-of-measurement.value-objects';

describe('UnitOfMeasurement', () => {
	it('should be defined', () => {
		const unitOfMeasurement = UnitOfMeasurementValueObject.create('KG');
		expect(unitOfMeasurement).toBeDefined();
		expect(unitOfMeasurement.isSuccess).toBe(true);
	});

	it('should fail if provide an invalid value', () => {
		const unitOfMeasurement = UnitOfMeasurementValueObject.create(
			'KKAS' as any
		);
		expect(unitOfMeasurement.isFailure).toBe(true);
	});
});
