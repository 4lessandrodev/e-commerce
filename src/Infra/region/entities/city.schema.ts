import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AvailableInitials } from '@domain/value-objects';

export type initials = keyof typeof AvailableInitials;

@Schema({ autoCreate: true, timestamps: true })
export class City {
  @Prop({ type: String, required: true, index: true, immutable: true })
  readonly id!: string;

  @Prop({ type: String, required: true, index: true })
  name!: string;

  @Prop({ type: Number, required: true })
  geoCode!: number;

  @Prop({ enum: AvailableInitials, required: true })
  stateInitial!: initials;

  @Prop({ type: Date, default: new Date() })
  createdAt!: Date;

  @Prop({ type: Date, default: new Date() })
  updatedAt!: Date;
}

export const CitySchema = SchemaFactory.createForClass(City);
