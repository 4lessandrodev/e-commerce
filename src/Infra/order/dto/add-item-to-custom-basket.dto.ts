import { IsPositive, IsUUID } from 'class-validator';

export class AddItemToCustomBasketDto {
	@IsUUID()
	productId!: string;

	@IsUUID()
	basketId!: string;

	@IsUUID()
	clientId!: string;

	@IsPositive()
	quantityOfItemToAdd!: number;

	@IsUUID()
	customBasketId?: string;
}
