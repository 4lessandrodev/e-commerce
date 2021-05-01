import { RegionRepositoryInterface } from '@repo/region-repository.interface';
import { Filter } from 'types-ddd/dist/src';
import { Region } from '@domain/aggregates-root';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class RegionRepository implements RegionRepositoryInterface {
  constructor(
    /**
     * @todo inject region model
     */
    @InjectModel('region') private readonly region: Model<any>,
  ) {}
  //
  async find(filter: Filter): Promise<Region[] | null> {
    throw new Error('Method not implemented');
  }

  async findOne(filter: Filter): Promise<Region | null> {
    throw new Error('Method not implemented');
  }

  async delete(filter: Filter): Promise<void> {
    throw new Error('Method not implemented');
  }

  async exists(filter: Filter): Promise<boolean> {
    throw new Error('Method not implemented');
  }

  async save(target: Region): Promise<void> {
    throw new Error('Method not implemented');
  }
}
