import { IsUUID } from 'class-validator';

export class RemoveProductsFromBasketDto {
	@IsUUID()
	basketId!: string;

	@IsUUID('4', { each: true })
	productIds!: string[];
}
