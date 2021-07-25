import {
	IsObject,
	IsPositive,
	IsUUID,
	Max,
	ValidateNested
} from 'class-validator';

export class ItemDto {
	@IsUUID('4')
	productId!: string;

	@IsPositive()
	@Max(1000)
	quantity!: number;
}

export class AddProductsOnBasketDto {
	@IsUUID()
	basketId!: string;

	@IsObject({ each: true })
	@ValidateNested()
	items!: ItemDto[];
}
