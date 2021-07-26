import { ChangesLimitValueObject } from './changes-limit.value-object';

describe('exchange-factor.value-object', () => {
	//
	it('should be defined', () => {
		const exchange = ChangesLimitValueObject.create(7);
		expect(exchange).toBeDefined();
	});

	it('should fail if provide negative value', () => {
		const exchange = ChangesLimitValueObject.create(-1);
		expect(exchange.isFailure).toBe(true);
	});

	it('should fail if provide greater than 50', () => {
		const exchange = ChangesLimitValueObject.create(51);
		expect(exchange.isFailure).toBe(true);
	});

	it('should create with success', () => {
		const exchange = ChangesLimitValueObject.create(3);
		expect(exchange.isSuccess).toBe(true);
		expect(exchange.getResult().value).toBe(3);
	});
});
