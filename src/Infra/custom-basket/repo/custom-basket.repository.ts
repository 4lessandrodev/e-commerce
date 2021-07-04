import { CustomBasketRepositoryInterface, getCustomBasketFromOrderProps } from '@repo/custom-basket-repository.interface';
import { Filter } from 'types-ddd';
import { CustomBasket as Aggregate } from '@domain/aggregates-root';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomBasket, CustomBasketDocument } from '../entities/custom-basket.schema';
import { Inject } from '@nestjs/common';
import { CustomBasketMapper } from '../mapper/custom-basket.mapper';

export class CustomBasketRepository implements CustomBasketRepositoryInterface {

	constructor (
		@InjectModel(CustomBasket.name)
		private readonly conn: Model<CustomBasketDocument>,

		@Inject(CustomBasketMapper)
		private readonly mapper: CustomBasketMapper
	) { }

	async getCustomBasketFromOrder (props: getCustomBasketFromOrderProps): Promise<Aggregate | null> {
		const foundCustomBasket = await this.conn.findOne(props).exec();
		if (!foundCustomBasket) {
			return null;
		}
		return this.mapper.toDomain(foundCustomBasket);
	};

	async find (filter: Filter): Promise<Aggregate[] | null> {
		throw new Error(`Method not implemented for ${filter}`);
	}

	async findOne (filter: Filter): Promise<Aggregate | null> {
		throw new Error(`Method not implemented for ${filter}`);
	}

	async delete (filter: Filter): Promise<void> {
		throw new Error(`Method not implemented for ${filter}`);
	}

	async exists (filter: Filter): Promise<boolean> {
		return await this.conn.exists(filter);
	}

	async save (target: Aggregate): Promise<void> {
		const schema = this.mapper.toPersistence(target);
		const exists = await this.exists({ id: schema.id });
		if (exists) {
			await this.conn.updateOne(
				{ id: schema.id },
				schema,
				{ upsert: true }).exec();
		} else {
			console.log(schema);
			await new this.conn(schema).save();
		}
	}
}