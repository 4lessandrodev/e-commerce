import { ProductId } from '@domain/aggregates-root';
import { BasketItemValueObject } from './basket-item.value-object';
import { ExchangeFactorValueObject } from '../exchange-factor/exchange-factor.value-object';
import { ProductDescriptionValueObject } from '../product-description/product-description.value-object';
import { QuantityAvailableValueObject } from '../quantity-in-stock/quantity-in-stock.value-object';
import { UnitOfMeasurementValueObject } from '../unit-of-measurement/unit-of-measurement.value-objects';

describe('BasketItem.value-object', () => {
	it('should be defined', () => {
		const item = BasketItemValueObject.create({
			exchangeFactor: ExchangeFactorValueObject.create(3).getResult(),
			productId: ProductId.create(),
			description:
				ProductDescriptionValueObject.create(
					'valid_description'
				).getResult(),
			quantity: QuantityAvailableValueObject.create(2).getResult(),
			availableStock: QuantityAvailableValueObject.create(10).getResult(),
			unitOfMeasurement:
				UnitOfMeasurementValueObject.create('CX').getResult()
		});
		expect(item).toBeDefined();
		expect(item.isSuccess).toBe(true);
	});
});
