import { Module } from '@nestjs/common';
import { UpdateCollectionAddressUseCase } from '@app/update-collection-address-use-case/update-collection-address.use-case';
import { OrderAddressController } from './order-address.controller';
import { OrderAddressService } from './order-address.service';
import { RegisterCollectionAddressUseCase } from '@app/register-collection-address-use-case/register-collection-address.use-case';
import { DeleteCollectionAddressUseCase } from '@app/delete-collection-address-use-case/delete-collection-address.use-case';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressSchema, OrderAddress } from './entities/order-address.schema';
import { OrderAddressMapper } from './mapper/order-address.mapper';
import { CollectionAddressRepository } from './repo/order-address.repository';
import { UserModule } from '../user/user.module';

@Module({
	imports: [
		UserModule,
		MongooseModule.forFeature([
			{
				name: OrderAddress.name,
				schema: AddressSchema
			}
		])
	],
	controllers: [OrderAddressController],
	providers: [
		OrderAddressMapper,
		OrderAddressService,
		{
			provide: 'CollectionAddressRepository',
			useClass: CollectionAddressRepository
		},
		UpdateCollectionAddressUseCase,
		RegisterCollectionAddressUseCase,
		DeleteCollectionAddressUseCase
	]
})
export class OrderAddressModule {}
