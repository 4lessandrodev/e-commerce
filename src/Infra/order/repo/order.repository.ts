import {
	hasClientOpenedOrderProps,
	OrderRepositoryInterface,
} from '@repo/order-repository.interface';
import { Filter } from 'types-ddd/dist/src';
import { Order as Aggregate } from '@domain/aggregates-root';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from '../entities/order.schema';
import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { OrderMapper } from '../mapper/order.mapper';

@Injectable()
export class OrderRepository implements OrderRepositoryInterface {
	constructor (
		@InjectModel(Order.name)
		private readonly conn: Model<OrderDocument>,

		@Inject(OrderMapper)
		private readonly mapper: OrderMapper,
	) { }
	async hasClientOpenedOrder (
		props: hasClientOpenedOrderProps,
	): Promise<boolean> {
		const { clientId, status } = props;
		return this.conn.exists({ id: clientId, status });
	}

	async getClientOpenedOrder (
		props: hasClientOpenedOrderProps,
	): Promise<Aggregate | null> {
		const { clientId, status } = props;
		const foundOrder = await this.conn.findOne({ clientId, status }).exec();
		if (!foundOrder) {
			return null;
		}

		return this.mapper.toDomain(foundOrder);
	}

	async find (filter: Filter): Promise<Aggregate[] | null> {
		const foundOrders = await this.conn.find(filter);
		if (foundOrders.length === 0) {
			return null;
		}
		return foundOrders.map((order) => this.mapper.toDomain(order));
	}

	async findOne (filter: Filter): Promise<Aggregate | null> {
		const foundOrder = await this.conn.findOne(filter);

		if (!foundOrder) {
			return null;
		}

		return this.mapper.toDomain(foundOrder);
	}

	async delete (filter: Filter): Promise<void> {
		await this.conn.findOneAndDelete(filter);
	}

	async exists (filter: Filter): Promise<boolean> {
		return await this.conn.exists(filter);
	}

	async save (target: Aggregate): Promise<void> {

		const schema = this.mapper.toPersistence(target);
		const exists = await this.exists({ id: schema.id });
		if (exists) {
			await this.conn.updateOne({ id: schema.id }, schema).exec();
		} else {
			await new this.conn(schema).save();
		}
	}
}
