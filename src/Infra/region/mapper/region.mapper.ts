import { IMapper, UniqueEntityID } from 'types-ddd';
import { Region } from '@domain/aggregates-root';
import { Region as Schema } from '../entities/region.schema';
import { CityMapper } from './city.mapper';
import {
	AvailableLocale,
	Currency,
	MonetaryValueObject,
} from '@domain/value-objects';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class RegionMapper implements IMapper<Region, Schema> {
	constructor (
		@Inject(CityMapper)
		private readonly cityMapper: CityMapper,
	) { }
	toDomain (target: Schema): Region {
		return Region.create(
			{
				city: this.cityMapper.toDomain(target.city),
				description: target.description,
				freightPrice: MonetaryValueObject.create(
					Currency.create(target.freightPrice.value).getResult(),
				).getResult(),
				isActive: target.isActive,
				createdAt: target.createdAt,
				updatedAt: target.updatedAt,
			},
			new UniqueEntityID(target.id),
		).getResult();
	}
	toPersistence (target: Region): Schema {
		return {
			id: target.id.toString(),
			city: this.cityMapper.toPersistence(target.city),
			createdAt: target.createdAt,
			description: target.description,
			freightPrice: {
				locale: target.freightPrice.currency.locale as AvailableLocale,
				symbol: target.freightPrice.currency.symbol,
				value: target.freightPrice.currency.value,
			},
			isActive: target.isActive,
			updatedAt: target.updatedAt,
		};
	}
}
