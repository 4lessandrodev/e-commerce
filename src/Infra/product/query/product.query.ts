import { ProductFilter } from '../interfaces/product.filters.interface';
import { Product, ProductDocument } from '../entities/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  GetProductsResult,
  ProductQueryInterface,
} from '../interfaces/product.query.interface';

export class ProductQuery implements ProductQueryInterface {
  constructor(
    @InjectModel(Product.name) private readonly conn: Model<ProductDocument>,
  ) {}
  async getProducts(filter: ProductFilter): Promise<GetProductsResult> {
    //
    const { search = '', limit = 10, skip = 0 } = filter;
    const limitNumber = parseInt(String(limit), 10);
    const skipNumber = parseInt(String(skip), 10);

    if (!search) {
      // Count
      const totalOfRegisters = await this.conn.find({}).count();

      // Get registers
      /**
       * @todo implement filter only active products showing for client and all products for admin
       */
      const products = await this.conn
        .find(
          { isActive: true },
          { _id: 0, __v: 0, updatedAt: 0, createdAt: 0 },
        )
        .skip(skipNumber)
        .limit(limitNumber)
        .sort({ description: 1 });

      return {
        totalOfRegisters,
        products,
      };
    }

    // Count
    const totalOfRegisters = await this.conn
      .find({
        $text: {
          $search: search,
        },
      })
      .count();

    // Get registers
    const products = await this.conn
      .find(
        {
          $text: {
            $search: search,
          },
          isActive: true,
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
      .skip(skipNumber)
      .limit(limitNumber);

    return {
      totalOfRegisters,
      products,
    };
  }
}
