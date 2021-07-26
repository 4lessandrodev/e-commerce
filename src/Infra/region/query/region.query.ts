import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Region, RegionDocument } from '../entities/region.schema';
import { RegionQueryInterface } from '../interfaces/region.query';

export class RegionQuery implements RegionQueryInterface {
	constructor(
		@InjectModel(Region.name) private readonly conn: Model<RegionDocument>
	) {}

	async getRegions(): Promise<Region[]> {
		const foundRegions = await this.conn
			.find({}, { _id: 0, __v: 0 })
			.exec();
		if (!foundRegions) {
			new NotFoundException('Regions not found');
		}

		return foundRegions;
	}
}
