import { UnitTypes } from '@domain/value-objects/unit-of-measurement/unit-of-measurement.value-objects';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AvailableCurrency, AvailableLocale } from '@domain/value-objects';
import { Category } from './category.schema';
import { Tag } from './tag.schema';
import { DomainEvents, UniqueEntityID } from 'types-ddd/dist/src';

// ---------------------------------------------------------------
type localeType = keyof typeof AvailableLocale;
type symbolType = keyof typeof AvailableCurrency;

export class Currency {
  @Prop({ type: Number, required: true })
  value!: number;

  @Prop({ type: String, required: true })
  symbol!: symbolType;

  @Prop({ type: String, required: true })
  locale!: localeType;
}

export type ProductDocument = Product & Document;

@Schema({ timestamps: true, autoCreate: true, autoIndex: true })
export class Product {
  @Prop({
    unique: true,
    index: true,
    type: String,
    immutable: true,
    required: true,
  })
  id!: string;

  @Prop({
    type: String,
    index: true,
    required: true,
    text: true,
  })
  description!: string;

  @Prop({ type: String, required: true })
  unitOfMeasurement!: UnitTypes;

  @Prop({ type: Object, required: true, index: true })
  category!: Category;

  @Prop({ type: String, required: false })
  image?: string;

  @Prop({ type: Boolean, required: true })
  isSpecial!: boolean;

  @Prop({ type: Currency, required: true })
  price!: Currency;

  @Prop({ type: Boolean, required: true })
  isActive!: boolean;

  @Prop({ type: Number, required: true, default: 0 })
  quantityAvailable!: number;

  @Prop({ type: Number, required: true, default: 0 })
  numberOfRatings!: number;

  @Prop({ type: Number, required: true, default: 1, index: true })
  exchangeFactor!: number;

  @Prop({ type: Number, required: true, default: 0 })
  ratingAverage!: number;

  @Prop({ type: Array, required: false, default: [] })
  comments?: string[];

  @Prop({ type: String, required: false })
  info?: string;

  @Prop({ type: [{ type: Object }] })
  tags?: Tag[];

  @Prop({ type: Date, default: new Date() })
  createdAt!: Date;

  @Prop({ type: Date, default: new Date() })
  updatedAt!: Date;
}

const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.virtual('Category', {
  ref: 'ProductCategory',
  localField: 'category.id',
  foreignField: 'id',
  justOne: true,
});

// Hooks to call domain event
ProductSchema.post('updateOne', { document: true }, function () {
  try {
    // @ts-expect-error
    const aggregateId = new UniqueEntityID(this?._update?.$setOnInsert?.id);
    DomainEvents.dispatchEventsForAggregate(aggregateId);
  } catch (error) {
    console.log(error.message);
  }
});

export { ProductSchema };
