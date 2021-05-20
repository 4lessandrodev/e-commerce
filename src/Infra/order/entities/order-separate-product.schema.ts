import { Prop } from '@nestjs/mongoose';
import { UnitTypes } from '@domain/value-objects';
import { Currency } from './order.schema';

export class SeparateProducts {
  @Prop({
    index: true,
    type: String,
    immutable: true,
    required: true,
  })
  productId!: string;

  @Prop({ type: String, required: true })
  image!: string;

  @Prop({
    type: String,
    index: true,
    required: true,
  })
  description!: string;

  @Prop({ type: String, required: true })
  unitOfMeasurement!: UnitTypes;

  @Prop({ type: String, required: false })
  category!: string;

  @Prop({ type: Boolean, required: true })
  isSpecial!: boolean;

  @Prop({ type: Currency, required: true })
  price!: Currency;

  @Prop({ type: Number, required: true, default: 0 })
  quantity!: number;
}
