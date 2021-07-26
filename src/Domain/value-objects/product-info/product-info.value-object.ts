import { Result, ValueObject } from 'types-ddd';
import { validateStringLengthBetweenMaxAndMin } from '@domain/utils';
import { ERROR_PRODUCT_INFO_MAX_LENGTH } from './product-info-errors.domain';
export const MAX_PRODUCT_INFO_LENGTH = 250;
export const MIN_PRODUCT_INFO_LENGTH = 3;

interface ProductInfoProps {
	value: string;
}

export class ProductInfoValueObject extends ValueObject<ProductInfoProps> {
	private constructor(props: ProductInfoProps) {
		super(props);
	}

	get value(): string {
		return this.props.value.toLowerCase();
	}

	public static create(description: string): Result<ProductInfoValueObject> {
		const isValidDescription = validateStringLengthBetweenMaxAndMin({
			text: description,
			maxLength: MAX_PRODUCT_INFO_LENGTH,
			minLength: MIN_PRODUCT_INFO_LENGTH
		});

		if (!isValidDescription) {
			return Result.fail<ProductInfoValueObject>(
				ERROR_PRODUCT_INFO_MAX_LENGTH
			);
		}

		return Result.ok<ProductInfoValueObject>(
			new ProductInfoValueObject({ value: description })
		);
	}
}
