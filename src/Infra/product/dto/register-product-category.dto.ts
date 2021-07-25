import { IsString, Length } from 'class-validator';
import {
	MAX_PRODUCT_CATEGORY_DESCRIPTION_LENGTH,
	MIN_PRODUCT_CATEGORY_DESCRIPTION_LENGTH
} from '@domain/entities';

export class RegisterProductCategoryDto {
	@IsString()
	@Length(
		MIN_PRODUCT_CATEGORY_DESCRIPTION_LENGTH,
		MAX_PRODUCT_CATEGORY_DESCRIPTION_LENGTH
	)
	description!: string;
}
