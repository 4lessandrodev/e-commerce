import { BasketRepositoryInterface } from '@repo/basket-repository.interface';
import { Filter } from 'types-ddd/dist/src';
import { Basket } from '@domain/aggregates-root';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BasketDocument } from '../entities/basket.schema';

@Injectable()
export class BasketRepository implements BasketRepositoryInterface {
  //
  constructor(
    @InjectModel(Basket.name) private readonly conn: Model<BasketDocument>,
  ) {}
  //
  find(filter: Filter): Promise<Basket[] | null> {
    throw new Error('Method not implemented');
  }
  //
  findOne(filter: Filter): Promise<Basket | null> {
    throw new Error('Method not implemented');
  }
  //
  delete(filter: Filter): Promise<void> {
    throw new Error('Method not implemented');
  }
  //
  exists(filter: Filter): Promise<boolean> {
    throw new Error('Method not implemented');
  }
  //
  save(target: Basket): Promise<void> {
    throw new Error('Method not implemented');
  }
  //
}
