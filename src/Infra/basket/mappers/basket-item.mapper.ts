import { IMapper, UniqueEntityID } from 'types-ddd';
import {
	BasketItemValueObject as Aggregate,
	ImageValueObject,
} from '@domain/value-objects';
import { UnitOfMeasurementValueObject } from '@domain/value-objects';
import { ExchangeFactorValueObject } from '@domain/value-objects';
import { QuantityAvailableValueObject } from '@domain/value-objects';
import { ProductDescriptionValueObject } from '@domain/value-objects';
import { Item as Schema } from '../entities/basket.schema';
import { ProductId } from '@domain/aggregates-root';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BasketItemMapper implements IMapper<Aggregate, Schema> {
	toDomain (target: Schema): Aggregate {
		return Aggregate.create({
			description: ProductDescriptionValueObject.create(
				target.description,
			).getResult(),
			exchangeFactor: ExchangeFactorValueObject.create(
				target.exchangeFactor,
			).getResult(),
			productId: ProductId.create(new UniqueEntityID(target.productId)),
			quantity: QuantityAvailableValueObject.create(
				target.quantity,
			).getResult(),
			availableStock: QuantityAvailableValueObject.create(
				target.availableStock,
			).getResult(),
			unitOfMeasurement: UnitOfMeasurementValueObject.create(
				target.unitOfMeasurement,
			).getResult(),
			image: target?.image
				? ImageValueObject.create(target.image).getResult()
				: undefined,
		}).getResult();
	}
	//
	toPersistence (target: Aggregate): Schema {
		return {
			description: target.value.description.value,
			exchangeFactor: target.value.exchangeFactor.value,
			productId: target.value.productId.id.toString(),
			quantity: target.value.quantity.value,
			availableStock: target.value.availableStock.value,
			unitOfMeasurement: target.value.unitOfMeasurement.value,
			image: target.value.image?.value,
		};
	}
}
