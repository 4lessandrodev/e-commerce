import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisterClientUseCase } from '@app/register-client-use-case/register-client.use-case';
import { UserModule } from '../user/user.module';
import { Client, ClientSchema } from './entities/client.schema';
import { ClientMapper } from './mapper/client.mapper';
import { AddressMapper } from './mapper/address.mapper';
import { ClientRepository } from './repo/client.repository';
import { RegionRepository } from '../region/repo/region.repository';
import { RegionMapper } from '../region/mapper/region.mapper';
import { CityMapper } from '../region/mapper/city.mapper';
import { Region, RegionSchema } from '../region/entities/region.schema';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

@Module({
	imports: [
		UserModule,
		MongooseModule.forFeature([
			{ name: Client.name, schema: ClientSchema },
			{ name: Region.name, schema: RegionSchema }
		])
	],
	providers: [
		CityMapper,
		RegionMapper,
		AddressMapper,
		ClientMapper,
		ClientRepository,
		RegionRepository,
		{
			provide: 'ClientRepository',
			useClass: ClientRepository
		},
		{
			provide: 'RegionRepository',
			useClass: RegionRepository
		},
		RegisterClientUseCase,
		ClientService
	],
	controllers: [ClientController],
	exports: ['ClientRepository']
})
export class ClientModule {}
