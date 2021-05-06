import { TagRepositoryInterface } from '@repo/tag.repository.interface';
import { Tag as Aggregate } from '@domain/entities';
import { Inject } from '@nestjs/common';
import { TagMapper } from '../mapper/tag.mapper';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag, TagDocument } from '../entities/tag.schema';
import { Filter } from 'types-ddd/dist/src';

export class TagRepository implements TagRepositoryInterface {
  //
  constructor(
    @InjectModel(Tag.name) private readonly conn: Model<TagDocument>,
    @Inject(TagMapper) private readonly mapper: TagMapper,
  ) {}
  //
  async updateOrCreate(tag: Aggregate): Promise<void> {
    const persistence = this.mapper.toPersistence(tag);

    await this.conn.findOneAndUpdate({ id: persistence.id }, persistence, {
      upsert: true,
    });
  }

  async exists(filter: Filter): Promise<boolean> {
    return await this.conn.exists(filter);
  }
}
