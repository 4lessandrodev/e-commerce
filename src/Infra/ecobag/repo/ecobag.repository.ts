import { Inject, Injectable } from '@nestjs/common';
import { EcobagRepositoryInterface } from '@repo/ecobag.repository.interface';
import { Ecobag as Aggregate } from '@domain/entities';
import { Currency, MonetaryValueObject } from '@domain/value-objects';
import { InjectModel } from '@nestjs/mongoose';
import { Ecobag, EcobagDocument } from '../entities/ecobag.schema';
import { Model } from 'mongoose';
import { EcobagMapper } from '../mapper/ecobag.mapper';

@Injectable()
export class EcobagRepository implements EcobagRepositoryInterface {
  constructor(
    @InjectModel(Ecobag.name)
    private readonly conn: Model<EcobagDocument>,

    @Inject(EcobagMapper)
    private readonly mapper: EcobagMapper,
  ) {}

  async definePrice(ecobag: Aggregate): Promise<void> {
    const schema = this.mapper.toPersistence(ecobag);
    await this.conn.updateOne({ id: schema.id }, schema, { upsert: true });
  }

  async getPrice(id: string): Promise<MonetaryValueObject> {
    const price = MonetaryValueObject.create(
      Currency.create(0).getResult(),
    ).getResult();

    const foundEcobag = await this.conn.findOne({ id });
    if (!foundEcobag) {
      return price; // 0.00
    }

    price.currency.sum(foundEcobag.price);
    return price;
  }
}
