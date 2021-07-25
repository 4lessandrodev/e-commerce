import { CityRepositoryInterface } from '@repo/city.repository.interface';
import { Filter } from 'types-ddd';
import { City as Entity } from '@domain/entities';
import { Inject } from '@nestjs/common';
import { CityMapper } from '../mapper/city.mapper';
import { InjectModel } from '@nestjs/mongoose';
import { City, CityDocument } from '../entities/city.schema';
import { Model } from 'mongoose';

export class CityRepository implements CityRepositoryInterface {
	//
	constructor(
		@InjectModel(City.name) private readonly conn: Model<CityDocument>,
		@Inject(CityMapper)
		private readonly mapper: CityMapper
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
		const foundCity = await this.conn.findOne(filter).exec();
		if (foundCity == null) {
			return null;
		}
		return this.mapper.toDomain(foundCity);
	}
	//
}
