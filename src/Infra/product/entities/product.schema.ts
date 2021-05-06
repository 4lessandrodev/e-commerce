import { UnitTypes } from '@domain/value-objects/unit-of-measurement/UnitOfMeasurement.value-objects';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AvailableCurrency, AvailableLocale } from '@domain/value-objects';
import { ProductCategory } from './product-category.schema';
import { ProductTag } from './product-tag.schema';

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

  @Prop({ type: String, index: true, unique: true, required: true })
  description!: string;

  @Prop({ type: String, required: true })
  unitOfMeasurement!: UnitTypes;

  @Prop({ type: String, required: true, index: true })
  category!: ProductCategory;

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

  @Prop({ type: Number, required: true, default: 0 })
  ratingAverage!: number;

  @Prop({ type: Array, required: false, default: [] })
  comments?: string[];

  @Prop({ type: String, required: false })
  info?: string;

  @Prop({ type: [ProductTag] })
  tags?: ProductTag[];
}

const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.virtual('Category', {
  ref: 'Category',
  localField: 'category.id',
  foreignField: 'id',
  justOne: true,
});

export { ProductSchema };
