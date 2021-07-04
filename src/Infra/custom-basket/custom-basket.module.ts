import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomBasket, CustomBasketSchema } from './entities/custom-basket.schema';
import { CustomBasketItemMapper } from './mapper/custom-basket-item.mapper';
import { CustomBasketMapper } from './mapper/custom-basket.mapper';
import { CustomBasketRepository } from './repo/custom-basket.repository';

@Module({
	imports: [
		MongooseModule.forFeature(
			[
				{
					name: CustomBasket.name,
					schema: CustomBasketSchema
				}
			]
		)
	],
	providers: [
		CustomBasketItemMapper,
		CustomBasketMapper,
		{
			provide: 'CustomBasketRepository',
			useClass: CustomBasketRepository
		}
	],
	controllers: [],
	exports: [
		'CustomBasketRepository',
		CustomBasketItemMapper,
		CustomBasketMapper
	]
})
export class CustomBasketModule { }