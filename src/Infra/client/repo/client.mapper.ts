import { IMapper, UniqueEntityID } from 'types-ddd';
import { Client, UserId } from '@domain/aggregates-root';
import { Client as Schema } from '../entities/client.schema';
import { AddressMapper } from './address.mapper';
import { ImageValueObject, UserNameValueObject } from '@domain/value-objects';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ClientMapper implements IMapper<Client, Schema> {
  constructor(
    @Inject(AddressMapper)
    private readonly addressMapper: AddressMapper,
  ) {}
  toDomain(target: Schema): Client {
    return Client.create(
      {
        addresses: target.addresses.map(this.addressMapper.toDomain),
        hasEcobag: target.hasEcobag,
        name: UserNameValueObject.create(target.name).getResult(),
        avatar: target.avatar
          ? ImageValueObject.create(target.avatar).getResult()
          : undefined,
        createdAt: target.createdAt,
        updatedAt: target.updatedAt,
      },
      UserId.create(new UniqueEntityID(target.id)).id,
    ).getResult();
  }
  toPersistence(target: Client): Schema {
    return {
      id: target.id.toString(),
      addresses: target.addresses.map(this.addressMapper.toPersistence),
      avatar: target.avatar?.value,
      hasEcobag: target.hasEcobag,
      name: target.name.value,
      createdAt: target.createdAt,
      updatedAt: target.updatedAt,
    };
  }
}
