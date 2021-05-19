import { ProductRepositoryInterface } from '@repo/product-repository.interface';
import { Filter } from 'types-ddd';
import { Product as Aggregate } from '@domain/aggregates-root';
import { Inject, Injectable } from '@nestjs/common';
import { ProductMapper } from '../mapper/product.mapper';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../entities/product.schema';

@Injectable()
export class ProductRepository implements ProductRepositoryInterface {
  //
  constructor(
    @InjectModel(Product.name) private readonly conn: Model<ProductDocument>,
    @Inject(ProductMapper) private readonly mapper: ProductMapper,
  ) {}
  //
  async find(filter: Filter): Promise<Aggregate[] | null> {
    const foundProduct = await this.conn.find(filter).exec();
    if (!foundProduct) {
      return null;
    }
    return foundProduct.map((product) => this.mapper.toDomain(product));
  }
  //
  async findOne(filter: Filter): Promise<Aggregate | null> {
    const foundProduct = await this.conn.findOne(filter).exec();
    if (!foundProduct) {
      return null;
    }
    return this.mapper.toDomain(foundProduct);
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
  async save(target: Aggregate): Promise<void> {
    const persistence = this.mapper.toPersistence(target);

    const productExists = await this.exists({ id: persistence.id });

    if (productExists) {
      /**
       * @event updateItemsOnBaskets
       * @description this method calls hooks to update item on baskets
       * @see product.schema
       */
      await this.conn
        .updateOne({ id: persistence.id }, persistence, {
          upsert: true,
        })
        .exec();
      return;
    }
    await new this.conn(persistence).save();
  }
  //
  async findProductsByIds(ids: string[]): Promise<Aggregate[] | null> {
    const foundProducts = await this.conn.find({ id: { $in: ids } }).exec();

    if (foundProducts.length === 0) {
      return null;
    }
    return foundProducts.map((product) => this.mapper.toDomain(product));
  }
  //

  async deactivateManyProducts(ids?: string[]): Promise<void> {
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

  async resetStock(ids?: string[]): Promise<void> {
    if (ids) {
      await this.conn
        .updateMany(
          { id: { $in: ids } },
          { quantityAvailable: 0 },
          { multi: true },
        )
        .exec();
    } else {
      await this.conn
        .updateMany(
          { quantityAvailable: { $gt: 0 } },
          { quantityAvailable: 0 },
          { multi: true },
        )
        .exec();
    }
  }

  async findAllProductsOrFilteredByIds(
    ids?: string[],
  ): Promise<Aggregate[] | null> {
    //

    if (ids) {
      const foundProducts = await this.conn.find({ id: { $in: ids } }).exec();
      if (foundProducts.length === 0) {
        return null;
      }
      return foundProducts.map((product) => this.mapper.toDomain(product));
    }

    const foundProducts = await this.conn
      .find({
        quantityAvailable: { $gt: 0 },
      })
      .exec();

    if (foundProducts.length === 0) {
      return null;
    }
    return foundProducts.map((product) => this.mapper.toDomain(product));
  }
}
