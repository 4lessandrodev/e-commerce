import { RegionRepositoryInterface } from '@repo/region-repository.interface';
import { Filter } from 'types-ddd/dist/src';
import { Region as Aggregate } from '@domain/aggregates-root';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegionDocument, Region } from '../entities/region.schema';
import { Inject, Injectable } from '@nestjs/common';
import { RegionMapper } from '../mapper/region.mapper';

@Injectable()
export class RegionRepository implements RegionRepositoryInterface {
  constructor(
    @InjectModel(Region.name) private readonly conn: Model<RegionDocument>,
    @Inject(RegionMapper) private readonly mapper: RegionMapper,
  ) {}
  //
  async find(filter: Filter): Promise<Aggregate[] | null> {
    throw new Error('Method not implemented');
  }

  async findOne(filter: Filter): Promise<Aggregate | null> {
    const foundRegion = await this.conn.findOne(filter).exec();
    if (!foundRegion) {
      return null;
    }
    return this.mapper.toDomain(foundRegion);
  }

  async delete(filter: Filter): Promise<void> {
    throw new Error('Method not implemented');
  }

  async exists(filter: Filter): Promise<boolean> {
    return await this.conn.exists(filter);
  }

  async save(target: Aggregate): Promise<void> {
    const schema = this.mapper.toPersistence(target);
    await this.conn
      .findOneAndUpdate({ id: target.id }, schema, {
        upsert: true,
      })
      .exec();
  }
}
