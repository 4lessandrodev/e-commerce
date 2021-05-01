import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AddressDocument = Address & Document;

@Schema({ autoCreate: true, timestamps: true })
export class Address {
  @Prop({ type: String, required: true, index: true, immutable: true })
  readonly id!: string;

  @Prop({ type: String, required: true, index: true })
  zipCode!: string;

  @Prop({ type: String, required: true })
  street!: string;

  @Prop({ type: String, required: true })
  number!: string;

  @Prop({ type: String, required: false })
  complement!: string;

  @Prop({ type: String, required: true })
  regionId!: string; // Relationship

  @Prop({ type: Boolean, required: true })
  isMainAddress!: boolean;

  @Prop({ type: Date, required: true, default: new Date() })
  createdAt!: Date;

  @Prop({ type: Date, required: true, default: new Date() })
  updatedAt!: Date;
}

export const AddressSchema = SchemaFactory.createForClass(Address);

AddressSchema.virtual('region', {
  ref: 'Region',
  localField: 'region',
  foreignField: 'id',
});
