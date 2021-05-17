import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientRepositoryInterface } from '@repo/client-repository.interface';
import { Client, ClientDocument } from '../entities/client.schema';
import { Model } from 'mongoose';
import { Filter } from 'types-ddd';
import { Client as Aggregate } from '@domain/aggregates-root';
import { ClientMapper } from '../mapper/client.mapper';

@Injectable()
export class ClientRepository implements ClientRepositoryInterface {
  //
  constructor(
    @InjectModel(Client.name) private readonly conn: Model<ClientDocument>,
    @Inject(ClientMapper) private readonly mapper: ClientMapper,
  ) {}

  async find(filter: Filter): Promise<Aggregate[] | null> {
    const clientsFound = await this.conn.find(filter).exec();

    if (!clientsFound) {
      return null;
    }

    return clientsFound.map(this.mapper.toDomain);
  }

  async findOne(filter: Filter): Promise<Aggregate | null> {
    const clientFound = await this.conn.findOne(filter).exec();

    if (!clientFound) {
      return null;
    }

    return this.mapper.toDomain(clientFound);
  }

  async delete(filter: Filter): Promise<void> {
    await this.conn.deleteOne(filter).exec();
  }

  async exists(filter: Filter): Promise<boolean> {
    return await this.conn.exists(filter);
  }

  async save(target: Aggregate): Promise<void> {
    const schema = this.mapper.toPersistence(target);
    await this.conn
      .updateOne({ id: schema.id }, schema, { upsert: true })
      .exec();
  }
}
