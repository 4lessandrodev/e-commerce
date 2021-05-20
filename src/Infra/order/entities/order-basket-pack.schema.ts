import { Prop } from '@nestjs/mongoose';
import { Currency } from '@domain/value-objects';

export class BasketPack {
  @Prop({ type: String, required: true })
  id!: string;

  @Prop({ type: String, required: true })
  basketId!: string;

  @Prop({ type: String, required: true })
  image!: string;

  @Prop({ type: String, required: true })
  packId!: string;

  @Prop({ type: String, required: true })
  description!: string;

  @Prop({ type: Number, required: true })
  quantityOfBaskets!: number;

  @Prop({ type: Date, required: true })
  startsAt!: Date;

  @Prop({ type: String, required: true })
  deliveryFrequency!: string;

  @Prop({ type: Currency, required: true })
  price!: Currency;
}
