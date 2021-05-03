import { AvailableInitialsType } from '@domain/value-objects';

export interface RegisterCityDto {
  name: string;
  geoCode: number;
  state: AvailableInitialsType;
}
