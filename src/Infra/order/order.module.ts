import { Module } from '@nestjs/common';
import { UserModule } from '@infra/user/user.module';
import { OrderController } from './order.controller';
import { AddItemToCustomBasketUseCase } from '@app/add-item-to-custom-basket-use-case/add-item-to-custom-basket.use-case';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomBasketDomainService } from '@domain/services/custom-basket.domain-service';
import { OpenOrderUseCase } from '@app/open-order-use-case/open-order.use-case';
import { OrderRepository } from './repo/order.repository';
import { Order, OrderSchema } from './entities/order.schema';
import { OrderMapper } from './mapper/order.mapper';
import { OrderAddressMapper } from '../order-address/mapper/order-address.mapper';
import { ProductModule } from '../product/product.module';
import { BasketModule } from '../basket/basket.module';
import { BasketPackMapper } from './mapper/basket-pack.mapper';
import { SeparateProductMapper } from './mapper/separate-product.mapper';
import { ClientModule } from '../client/client.module';
import { RegionModule } from '../region/region.module';
import { EcobagModule } from '../ecobag/ecobag.module';
import { OrderService } from './order.service';
import { RemoveItemFromCustomBasketUseCase } from '@app/remove-item-from-custom-basket-use-case/remove-item-from-custom-basket.use-case';
import { OrderDomainService } from '@domain/services/order.domain-service';
import { CustomBasketModule } from '../custom-basket/custom-basket.module';

@Module({
	imports: [
		UserModule,
		CustomBasketModule,
		ProductModule,
		BasketModule,
		ClientModule,
		RegionModule,
		EcobagModule,
		MongooseModule.forFeature([
			{
				name: Order.name,
				schema: OrderSchema
			}
		])
	],
	controllers: [
		OrderController
	],
	providers: [
		OrderService,
		OrderMapper,
		OrderAddressMapper,
		BasketPackMapper,
		SeparateProductMapper,
		AddItemToCustomBasketUseCase,
		RemoveItemFromCustomBasketUseCase,
		OrderDomainService,
		{
			provide: 'OrderRepository',
			useClass: OrderRepository,
			inject: [OrderMapper]
		},
		CustomBasketDomainService,
		OpenOrderUseCase
	]
})
export class OrderModule { }
