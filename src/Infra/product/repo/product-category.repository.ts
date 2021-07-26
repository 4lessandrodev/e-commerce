import { ProductCategoryRepositoryInterface } from '@repo/product-category-repository.interface';
import { Filter } from 'types-ddd';
import { ProductCategory as Entity } from '@domain/entities';
import { Inject, Injectable } from '@nestjs/common';
import { ProductCategoryMapper } from '../mapper/product-category.mapper';
import { InjectModel } from '@nestjs/mongoose';
import {
	ProductCategory,
	ProductCategoryDocument
} from '../entities/product-category.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductCategoryRepository
	implements ProductCategoryRepositoryInterface
{
	constructor(
		@Inject(ProductCategoryMapper)
		private readonly mapper: ProductCategoryMapper,
		@InjectModel(ProductCategory.name)
		private readonly conn: Model<ProductCategoryDocument>
	) {}

	//
	async exists(filter: Filter): Promise<boolean> {
		return await this.conn.exists(filter);
	}

	//
	async save(target: Entity): Promise<void> {
		const schema = this.mapper.toPersistence(target);
		await this.conn
			.updateOne({ id: schema.id }, schema, { upsert: true })
			.exec();
	}

	//
	async delete(filter: Filter): Promise<void> {
		await this.conn.deleteOne(filter).exec();
	}

	//
	async findOne(filter: Filter): Promise<Entity | null> {
		const foundCategory = await this.conn.findOne(filter).exec();
		if (foundCategory == null) {
			return null;
		}
		return this.mapper.toDomain(foundCategory);
	}
	//
}
