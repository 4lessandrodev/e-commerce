import { Injectable } from '@nestjs/common';
import { ItemDto } from '@app/register-basket-use-case/register-basket.dto';
import { Basket, Product, ProductId } from '../aggregates-root';
import { BasketItemValueObject } from '../value-objects';
import { Tag } from '../entities';
import { BasketServiceInterface } from './interfaces/basket-service.interface';
import { UniqueEntityID } from 'types-ddd';

@Injectable()
export class BasketDomainService implements BasketServiceInterface {
  //
  /**
   *
   * @param items array of ItemDto
   * @param basket instance of Basket aggregate
   * @param products array of aggregates Product
   */
  addItemsOnBasket(
    items: ItemDto[],
    basket: Basket,
    products: Product[],
  ): void {
    for (const product of products) {
      //
      const itemFromDto = items.find(({ productId }) =>
        product.id.equals(new UniqueEntityID(productId)),
      );
      //
      if (itemFromDto) {
        const quantity = itemFromDto.quantity;
        //
        const item = BasketItemValueObject.create({
          description: product.description,
          exchangeFactor: product.exchangeFactor,
          productId: ProductId.create(product.id),
          quantity,
        }).getResult();

        basket.addProduct(item);
      }
    }
  }
  //
  /**
   *
   * @param basket instance of Basket aggregate
   * @param productsIds array of string as productIds
   */
  removeItemsFromBasket(basket: Basket, productsIds: string[]): void {
    for (const id of productsIds) {
      const productId = ProductId.create(new UniqueEntityID(id));
      basket.removeProduct(productId);
    }
  }
  //
  /**
   *
   * @param tags array of Entity Tag
   * @param basket instance of Basket aggregate
   */
  addTagsOnBasket(tags: Tag[], basket: Basket): void {
    for (const tag of tags) {
      basket.addTag(tag);
    }
  }
}
