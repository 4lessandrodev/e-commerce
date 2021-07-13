import { Entity, Result, UniqueEntityID } from 'types-ddd';
import { ProductProps } from './separate-product.domain-entity.interface';
import { Currency, ImageValueObject, UnitTypes } from '@domain/value-objects';
import { MonetaryValueObject } from '@domain/value-objects';
import { ProductDescriptionValueObject } from '@domain/value-objects';
import { QuantityAvailableValueObject } from '@domain/value-objects';
import { ProductCategory } from '@domain/entities';

export class SeparateProduct extends Entity<ProductProps> {
	private constructor (props: ProductProps, id?: UniqueEntityID) {
		super(props, id);
	}

	get id (): UniqueEntityID {
		return this._id;
	}

	get description (): ProductDescriptionValueObject {
		return this.props.description;
	}

	get image (): ImageValueObject | undefined {
		return this.props.image;
	}

	get unitOfMeasurement (): UnitTypes {
		return this.props.unitOfMeasurement;
	}

	get category (): ProductCategory {
		return this.props.category;
	}

	get isSpecial (): boolean {
		return this.props.isSpecial;
	}

	get price (): MonetaryValueObject {
		return this.props.price;
	}

	get quantity (): QuantityAvailableValueObject {
		return this.props.quantity;
	}

	get subTotal (): MonetaryValueObject {
		//
		const quantityOfItems = this.quantity.value;
		const unitPrice = this.price.getAlwaysPositiveValue();
		const subTotal = Currency.create(unitPrice).getResult();

		subTotal.multiply(quantityOfItems);

		const subTotalAsValueObject =
			MonetaryValueObject.create(subTotal).getResult();

		return subTotalAsValueObject;
	}

	public static create (
		props: ProductProps,
		id?: UniqueEntityID,
	): Result<SeparateProduct> {
		const isValidQuantity = props.quantity.value >= 1;
		if (!isValidQuantity) {
			return Result.fail<SeparateProduct>(
				'Invalid quantity to individual product. Quantity must be greater than 0',
			);
		}
		return Result.ok<SeparateProduct>(new SeparateProduct(props, id));
	}
}
