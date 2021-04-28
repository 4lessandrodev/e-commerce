import { Filter } from 'types-ddd/dist/src';

export interface BaseRepository<Aggregate> {
  exists: (filter: Filter) => Promise<boolean>;
  find: (filter: Filter) => Promise<Aggregate | null>;
  delete: (filter: Filter) => Promise<void>;
  save: (target: Aggregate) => Promise<void>;
}
