import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { City, CityDocument } from '../entities/city.schema';
import { CityQueryInterface } from '../interfaces/city.query';

export class CityQuery implements CityQueryInterface {
  constructor(
    @InjectModel(City.name) private readonly conn: Model<CityDocument>,
  ) {}

  async getCities(): Promise<City[]> {
    const foundCities = await this.conn.find({}, { _id: 0, __v: 0 }).exec();
    if (!foundCities) {
      new NotFoundException('Cities not found');
    }

    return foundCities;
  }
}
