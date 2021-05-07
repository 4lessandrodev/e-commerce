import { Tag } from '@domain/entities';
import { Filter } from 'types-ddd';

export interface TagRepositoryInterface {
  updateOrCreate: (tag: Tag) => Promise<void>;
  exists: (filter: Filter) => Promise<boolean>;
  findTagsById: (ids: string[]) => Promise<Tag[] | null>;
}
