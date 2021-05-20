import { Prop } from '@nestjs/mongoose';
import { AvailableInitials } from '@domain/value-objects';
import { AvailableInitialsType } from '@domain/value-objects';

export class OrderAddress {
  @Prop({ type: String, required: true, index: true })
  zipCode!: string;

  @Prop({ type: String, required: true })
  street!: string;

  @Prop({ type: String, required: true })
  number!: string;

  @Prop({ type: String, required: false })
  complement!: string;

  @Prop({ type: String, required: true, index: true })
  region!: string;

  @Prop({ required: true, type: String })
  city!: string;

  @Prop({ required: true, enum: AvailableInitials })
  state!: AvailableInitialsType;
}
