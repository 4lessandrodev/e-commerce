import { BasketRepositoryInterface } from '@repo/basket-repository.interface';
import { Filter } from 'types-ddd/dist/src';
import { Basket } from '@domain/aggregates-root';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BasketDocument } from '../entities/basket.schema';
import { BasketMapper } from '../mappers/basket.mapper';
import { UpdateBasketItemsDto } from '@app/update-basket-items-use-case/update-basket-items.dto';

@Injectable()
export class BasketRepository implements BasketRepositoryInterface {
  //
  constructor(
    @InjectModel(Basket.name) private readonly conn: Model<BasketDocument>,
    @Inject(BasketMapper) private readonly mapper: BasketMapper,
  ) {}
  //
  async deactivateManyBaskets(ids?: string[]): Promise<void> {
    if (ids) {
      await this.conn
        .updateMany({ id: { $in: ids } }, { isActive: false }, { multi: true })
        .exec();
      return;
    }

    await this.conn
      .updateMany({ isActive: true }, { isActive: false }, { multi: true })
      .exec();
  }
  //
  async find(filter: Filter): Promise<Basket[] | null> {
    const foundBaskets = await this.conn.find(filter).exec();
    if (foundBaskets.length === 0) {
      return null;
    }
    return foundBaskets.map((basket) => this.mapper.toDomain(basket));
  }
  //
  async findOne(filter: Filter): Promise<Basket | null> {
    const foundBasket = await this.conn.findOne(filter).exec();
    if (!foundBasket) {
      return null;
    }
    return this.mapper.toDomain(foundBasket);
  }
  //
  async delete(filter: Filter): Promise<void> {
    await this.conn.deleteOne(filter).exec();
  }
  //
  async exists(filter: Filter): Promise<boolean> {
    return await this.conn.exists(filter);
  }
  //
  async save(target: Basket): Promise<void> {
    const persistence = this.mapper.toPersistence(target);
    await this.conn
      .updateOne({ id: persistence.id }, persistence, { upsert: true })
      .exec();
  }
  //

  async updateAllBasketItemByProductId(
    item: UpdateBasketItemsDto,
  ): Promise<void> {
    await this.conn
      .updateMany(
        {
          'items.productId': item.productId,
        },
        {
          $set: {
            'items.$[].availableStock': item.availableStock,
            'items.$[].description': item.description,
            'items.$[].exchangeFactor': item.exchangeFactor,
            'items.$[].unitOfMeasurement': item.unitOfMeasurement,
            'items.$[].image': item.image,
          },
        },
        { multi: true },
      )
      .exec();
  }

  async resetStockOnBasketItems(productIds?: string[]): Promise<void> {
    if (productIds) {
      await this.conn
        .updateMany(
          { 'items.productId': { $in: productIds } },
          { $set: { 'items.$[].availableStock': 0 } },
          { multi: true },
        )
        .exec();
      return;
    }

    const result = await this.conn
      .updateMany(
        { 'items.availableStock': { $gt: 0 } },
        { $set: { 'items.$[].availableStock': 0 } },
        { multi: true },
      )
      .exec();

    console.log(result);
  }
}
