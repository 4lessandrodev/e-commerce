import { ProductFilter } from '../interfaces/product.filters.interface';
import { Product, ProductDocument } from '../entities/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
	GetProductsPayload,
	PageInfo,
	ProductQueryInterface,
} from '../interfaces/product.query.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductQuery implements ProductQueryInterface {
	constructor (
		@InjectModel(Product.name) private readonly conn: Model<ProductDocument>,
	) { }
	async getProducts (filter: ProductFilter): Promise<GetProductsPayload> {
		//
		const { search = '', limit = 10, offset = 0 } = filter;
		const limitNumber = parseInt(String(limit), 10);
		const skipNumber = parseInt(String(offset), 10);

		if (!search) {
			// Count
			const totalOfRegisters = await this.conn
				.find({ isActive: true })
				.countDocuments();

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

			const pageInfo: PageInfo = {
				hasNextPage: skipNumber + limitNumber < totalOfRegisters,
				hasPreviousPage: skipNumber > 0,
				totalOfRegisters,
			};

			return {
				pageInfo,
				products,
			};
		}

		// Count
		const totalOfRegisters = await this.conn
			.find({
				$text: {
					$search: search,
					$caseSensitive: false
				},
				isActive: true,
			})
			.countDocuments();

		// Get registers
		const products = await this.conn
			.find(
				{
					$text: {
						$search: search,
						$caseSensitive: false
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

		const pageInfo: PageInfo = {
			hasNextPage: skipNumber + limitNumber < totalOfRegisters,
			hasPreviousPage: skipNumber > 0,
			totalOfRegisters,
		};

		return {
			pageInfo,
			products,
		};
	}
}
