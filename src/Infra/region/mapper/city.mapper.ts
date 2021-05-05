import { IMapper, UniqueEntityID } from 'types-ddd';
import { City } from '@domain/entities';
import { City as Schema, initials } from '../entities/city.schema';
import { InitialStateValueObject } from '@domain/value-objects';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CityMapper implements IMapper<City, Schema> {
  toDomain(target: Schema): City {
    return City.create(
      {
        name: target.name,
        geoCode: target.geoCode,
        stateInitial: InitialStateValueObject.create(
          target.stateInitial,
        ).getResult(),
        createdAt: target.createdAt,
        updatedAt: target.updatedAt,
      },
      new UniqueEntityID(target.id),
    ).getResult();
  }
  toPersistence(target: City): Schema {
    return {
      id: target.id.toString(),
      geoCode: target.geoCode,
      name: target.name,
      stateInitial: target.stateInitial.value as initials,
      createdAt: target.createdAt,
      updatedAt: target.updatedAt,
    };
  }
}
