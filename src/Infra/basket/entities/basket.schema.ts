import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Category } from './category.schema';
import { AvailableCurrency, AvailableLocale } from '@domain/value-objects';
import { Tag } from '@infra/product/entities/tag.schema';

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

// ---------------------------------------------------------------
@Schema({ autoIndex: true })
export class Item {
  @Prop()
  exchangeFactor!: number;

  @Prop()
  productId!: string;

  @Prop()
  quantity!: number;

  @Prop()
  description!: string;
}

// ---------------------------------------------------------------

export type BasketDocument = Basket & Document;

@Schema({ autoCreate: true, autoIndex: true, timestamps: true })
export class Basket {
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

  @Prop({ type: Object, required: true, index: true })
  category!: Category;

  @Prop({ type: Currency, required: true })
  price!: Currency;

  @Prop({ type: Boolean, required: true })
  isActive!: boolean;

  @Prop()
  images?: string[];

  @Prop({ type: Number, required: true, default: 0 })
  numberOfRatings?: number;

  @Prop({ type: Number, required: true, default: 0 })
  ratingAverage?: number;

  @Prop({ type: [{ type: Object }] })
  items?: Item[];

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

const BasketSchema = SchemaFactory.createForClass(Basket);

BasketSchema.virtual('Category', {
  ref: 'BasketCategory',
  localField: 'category.id',
  foreignField: 'id',
  justOne: true,
});

export { BasketSchema };
