import { Injectable } from '@nestjs/common';
import { ItemDto } from '@app/register-basket-use-case/register-basket.dto';
import { Basket, Product, ProductId } from '../aggregates-root';
import { BasketItemValueObject } from '../value-objects';
import { Tag } from '../entities';
import { BasketServiceInterface } from './interfaces/basket-service.interface';

@Injectable()
export class BasketService implements BasketServiceInterface {
  //
  addItemOnBasket(items: ItemDto[], basket: Basket, products: Product[]): void {
    for (const product of products) {
      const validProduct = items.find(
        ({ productId }) => product.id.toString() === productId,
      );

      if (validProduct) {
        //
        const item = BasketItemValueObject.create({
          description: product.description,
          exchangeFactor: validProduct.exchangeFactor,
          productId: ProductId.create(product.id),
          quantity: validProduct.quantity,
        }).getResult();

        basket.addProduct(item);
      }
    }
  }
  //
  addTagsOnBasket(tags: Tag[], basket: Basket): void {
    for (const tag of tags) {
      basket.addTag(tag);
    }
  }
}
