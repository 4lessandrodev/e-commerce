import { Prop } from '@nestjs/mongoose';
import { Currency } from './order.schema';
import { Item } from './order-custom-basket-item.schema';
import { CustomBasketCategory } from './order-custom-basket-category.schema';

export class CustomBasket {
  @Prop({
    index: true,
    type: String,
    immutable: true,
    required: true,
  })
  id!: string;

  @Prop({
    index: true,
    type: String,
    immutable: true,
    required: true,
  })
  basketId!: string;

  @Prop({ type: String, required: true })
  image!: string;

  @Prop({
    type: String,
    index: true,
    required: true,
  })
  description!: string;

  @Prop({ type: Object, required: false })
  category!: CustomBasketCategory;

  @Prop({ type: { type: Object, required: false }, default: [] })
  items!: Item[];

  @Prop({ type: { type: Object, required: false }, default: [] })
  itemsAdded!: Item[];

  @Prop({ type: { type: Object, required: false }, default: [] })
  itemsRemoved!: Item[];

  @Prop({ type: Number, required: true })
  changesLimitAvailable!: number;

  @Prop({ type: Number, required: true })
  exchangesFactorAvailable!: number;

  @Prop({ type: Currency, required: true })
  price!: Currency;

  @Prop({ type: Number, required: true, default: 0 })
  quantity!: number;
}
