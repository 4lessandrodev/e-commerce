import { CollectionAddressRepositoryInterface } from '@repo/collection-address-repository.interface';
import { Filter } from 'types-ddd';
import { DeliveryOrCollectionAddress } from '@domain/entities';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
	OrderAddress,
	AddressDocument
} from '../entities/order-address.schema';

import { OrderAddressMapper } from '../mapper/order-address.mapper';

@Injectable()
export class CollectionAddressRepository
	implements CollectionAddressRepositoryInterface
{
	constructor(
		@InjectModel(OrderAddress.name)
		private readonly conn: Model<AddressDocument>,

		@Inject(OrderAddressMapper)
		private readonly mapper: OrderAddressMapper
	) {}

	async find(filter: Filter): Promise<DeliveryOrCollectionAddress[] | null> {
		const foundAddresses = await this.conn.find(filter).exec();
		if (foundAddresses.length < 1) {
			return null;
		}
		return foundAddresses.map((address) => this.mapper.toDomain(address));
	}

	async findOne(filter: Filter): Promise<DeliveryOrCollectionAddress | null> {
		const foundAddress = await this.conn.findOne(filter);
		if (foundAddress == null) {
			return null;
		}
		return this.mapper.toDomain(foundAddress);
	}

	async delete(filter: Filter): Promise<void> {
		await this.conn.findOneAndDelete(filter);
	}

	async exists(filter: Filter): Promise<boolean> {
		return await this.conn.exists(filter);
	}

	async save(target: DeliveryOrCollectionAddress): Promise<void> {
		const schema = this.mapper.toPersistence(target);
		await this.conn
			.updateOne({ id: schema.id }, schema, { upsert: true })
			.exec();
	}
}
