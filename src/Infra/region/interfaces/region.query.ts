import { Region } from '../entities/region.schema';

export interface RegionQueryInterface {
  getRegions: () => Promise<Region[]>;
}
