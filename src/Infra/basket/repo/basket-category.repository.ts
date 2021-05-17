import { BasketCategoryRepositoryInterface } from '@repo/basket-category-repository.interface';
import { BasketCategoryDocument } from '../entities/basket-category.schema';
import { BasketCategoryMapper } from '../mappers/basket-category.mapper';
import { Filter } from 'types-ddd/dist/src';
import { BasketCategory } from '@domain/entities';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inject } from '@nestjs/common';

export class BasketCategoryRepository
  implements BasketCategoryRepositoryInterface
{
  constructor(
    @InjectModel(BasketCategory.name)
    private readonly conn: Model<BasketCategoryDocument>,

    @Inject(BasketCategoryMapper)
    private readonly mapper: BasketCategoryMapper,
  ) {}
  //
  async exists(filter: Filter): Promise<boolean> {
    return await this.conn.exists(filter);
  }

  //
  async save(target: BasketCategory): Promise<void> {
    const persistence = this.mapper.toPersistence(target);
    await this.conn
      .updateOne({ id: persistence.id }, persistence, {
        upsert: true,
      })
      .exec();
  }

  //
  async delete(filter: Filter): Promise<void> {
    await this.conn.deleteOne(filter).exec();
  }

  //
  async findOne(filter: Filter): Promise<BasketCategory | null> {
    const foundCategory = await this.conn.findOne(filter).exec();

    if (!foundCategory) {
      return null;
    }

    return this.mapper.toDomain(foundCategory);
  }
  //
}
