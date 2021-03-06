import { IsOptional, IsPositive, IsUUID } from 'class-validator';

export class AddItemToCustomBasketDto {
	@IsUUID()
	productId!: string;

	@IsUUID()
	basketId!: string;

	@IsOptional()
	clientId!: string; // get from session

	@IsPositive()
	quantityOfItemToAdd!: number;

	@IsUUID()
	@IsOptional()
	customBasketId?: string; // create new one if not provided
}
