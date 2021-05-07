import { ProductRepositoryInterface } from '@repo/product-repository.interface';
import { Filter } from 'types-ddd';
import { Product as Aggregate } from '@domain/aggregates-root';
import { Inject } from '@nestjs/common';
import { ProductMapper } from '../mapper/product.mapper';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../entities/product.schema';

export class ProductRepository implements ProductRepositoryInterface {
  //
  constructor(
    @InjectModel(Product.name) private readonly conn: Model<ProductDocument>,
    @Inject(ProductMapper) private readonly mapper: ProductMapper,
  ) {}
  //
  async find(filter: Filter): Promise<Aggregate[] | null> {
    const foundProduct = await this.conn.find(filter);
    if (!foundProduct) {
      return null;
    }
    return foundProduct.map(this.mapper.toDomain);
  }
  //
  async findOne(filter: Filter): Promise<Aggregate | null> {
    const foundProduct = await this.conn.findOne(filter);
    if (!foundProduct) {
      return null;
    }
    return this.mapper.toDomain(foundProduct);
  }
  //
  async delete(filter: Filter): Promise<void> {
    await this.conn.findOneAndDelete(filter);
  }
  //
  async exists(filter: Filter): Promise<boolean> {
    return await this.conn.exists(filter);
  }
  //
  async save(target: Aggregate): Promise<void> {
    const persistence = this.mapper.toPersistence(target);
    await this.conn.findOneAndUpdate({ id: persistence.id }, persistence, {
      upsert: true,
    });
  }
  //
}
