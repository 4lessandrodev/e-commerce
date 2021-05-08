import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../entities/product.schema';
import { ProductFilter } from '../interfaces/product.filters.interface';
import { ProductQueryInterface } from '../interfaces/product.query.interface';

export class ProductQuery implements ProductQueryInterface {
  constructor(
    @InjectModel(Product.name) private readonly conn: Model<ProductDocument>,
  ) {}
  async getProducts(filter: ProductFilter): Promise<any> {
    const { search = '', limit = 10, skip = 0 } = filter;

    if (!search) {
      return await this.conn
        .find({}, { _id: 0, __v: 0, updatedAt: 0, createdAt: 0 })
        .skip(skip)
        .limit(limit)
        .sort({ description: 1 });
    }

    return await this.conn
      .find(
        {
          $text: {
            $search: search,
          },
        },
        {
          score: { $meta: 'textScore' },
          _id: 0,
          __v: 0,
          updatedAt: 0,
          createdAt: 0,
        },
      )
      .sort({ score: { $meta: 'textScore' } })
      .skip(skip)
      .limit(limit);
  }
}
