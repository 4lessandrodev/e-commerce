import { IMapper, UniqueEntityID } from 'types-ddd';
import {
	ProductCategory,
	SeparateProduct as Aggregate,
} from '@domain/entities';
import { SeparateProducts } from '../entities/order-separate-product.schema';
import { Currency, ImageValueObject } from '@domain/value-objects';
import { QuantityAvailableValueObject } from '@domain/value-objects';
import { ProductDescriptionValueObject } from '@domain/value-objects';
import { MonetaryValueObject } from '@domain/value-objects';

export class SeparateProductMapper
	implements IMapper<Aggregate, SeparateProducts>
{
	toDomain (target: SeparateProducts): Aggregate {
		return Aggregate.create(
			{
				category: ProductCategory.create({
					description: target.category,
				}).getResult(),
				description: ProductDescriptionValueObject.create(
					target.description,
				).getResult(),
				isSpecial: target.isSpecial,
				price: MonetaryValueObject.create(
					Currency.create(target.price.value).getResult(),
				).getResult(),
				quantity: QuantityAvailableValueObject.create(
					target.quantity,
				).getResult(),
				unitOfMeasurement: target.unitOfMeasurement,
				image: target.image
					? ImageValueObject.create(target.image).getResult()
					: undefined,
			},
			new UniqueEntityID(target.productId),
		).getResult();
	}
	toPersistence (target: Aggregate): SeparateProducts {
		return {
			category: target.category.id.toString(),
			description: target.description.value,
			image: target.image?.value,
			isSpecial: target.isSpecial,
			price: target.price.currency,
			productId: target.id.toString(),
			quantity: target.quantity.value,
			unitOfMeasurement: target.unitOfMeasurement,
		};
	}
}
