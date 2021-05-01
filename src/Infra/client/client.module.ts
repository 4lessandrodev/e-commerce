import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisterClientUseCase } from '@app/register-client-use-case/register-client.use-case';
import { UserModule } from '../user/user.module';
import { Client, ClientSchema } from './entities/client.schema';
import { ClientMapper } from './repo/client.mapper';
import { AddressMapper } from './repo/address.mapper';
import { ClientRepository } from './repo/client.repository';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
  ],
  providers: [
    ClientRepository,
    {
      provide: AddressMapper,
      useFactory: () => new AddressMapper(),
    },
    {
      provide: ClientMapper,
      useFactory: (addressMapper: AddressMapper) =>
        new ClientMapper(addressMapper),
      inject: [AddressMapper],
    },
    RegisterClientUseCase,
  ],
  controllers: [],
})
export class ClientModule {}
