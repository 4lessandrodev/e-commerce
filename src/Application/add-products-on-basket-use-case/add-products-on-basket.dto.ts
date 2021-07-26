import { ItemDto } from '../register-basket-use-case/register-basket.dto';

export interface AddProductsOnBasketDto {
	basketId: string;
	items: ItemDto[];
}
