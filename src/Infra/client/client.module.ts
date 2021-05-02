import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisterClientUseCase } from '@app/register-client-use-case/register-client.use-case';
import { UserModule } from '../user/user.module';
import { Client, ClientSchema } from './entities/client.schema';
import { ClientMapper } from './repo/client.mapper';
import { AddressMapper } from './repo/address.mapper';
import { ClientRepository } from './repo/client.repository';
import { RegionRepository } from '../region/repo/region.repository';
import { RegionMapper } from '../region/repo/region.mapper';
import { CityMapper } from '../region/repo/city.mapper';
import { Region, RegionSchema } from '../region/entities/region.schema';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: Client.name, schema: ClientSchema },
      { name: Region.name, schema: RegionSchema },
    ]),
  ],
  providers: [
    CityMapper,
    RegionMapper,
    AddressMapper,
    ClientMapper,
    ClientRepository,
    RegionRepository,
    RegisterClientUseCase,
    ClientService,
  ],
  controllers: [ClientController],
})
export class ClientModule {}
