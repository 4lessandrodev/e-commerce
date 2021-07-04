import { IsOptional, IsPositive, IsUUID } from 'class-validator';

export class RemoveItemFromCustomBasketDto {
	@IsUUID()
	productId!: string;

	@IsUUID()
	basketId!: string;

	@IsOptional()
	clientId!: string; // get from session

	@IsPositive()
	quantityOfItemToRemove!: number;

	@IsUUID()
	@IsOptional()
	customBasketId?: string; // create new one if not provided
}
