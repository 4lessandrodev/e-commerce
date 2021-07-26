import { ItemDto } from '@app/register-basket-use-case/register-basket.dto';
import { Basket, Product } from '@domain/aggregates-root';
import { Tag } from '@domain/entities';

export interface BasketServiceInterface {
	addItemsOnBasket: (
		items: ItemDto[],
		basket: Basket,
		products: Product[]
	) => void;

	addTagsOnBasket: (tags: Tag[], basket: Basket) => void;
}
