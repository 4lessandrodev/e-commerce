import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AvailableCurrency, AvailableLocale } from '@domain/value-objects';
import { City } from './city.schema';

type localeType = keyof typeof AvailableLocale;
type symbolType = keyof typeof AvailableCurrency;

export interface Currency {
  value: number;
  symbol: symbolType;
  locale: localeType;
}

export type RegionDocument = Region & Document;

@Schema({ autoCreate: true, timestamps: true })
export class Region {
  @Prop({ type: String, required: true, index: true, immutable: true })
  readonly id!: string;

  @Prop({ type: String, required: true, index: true })
  description!: string;

  @Prop({ type: Object, required: true })
  freightPrice!: Currency;

  @Prop({ type: Boolean, required: true })
  isActive!: boolean;

  @Prop({ required: true })
  city!: City;

  @Prop({ type: Date, default: new Date() })
  createdAt!: Date;

  @Prop({ type: Date, default: new Date() })
  updatedAt!: Date;
}

export const RegionSchema = SchemaFactory.createForClass(Region);
