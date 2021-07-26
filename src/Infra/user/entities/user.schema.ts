import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role, Roles } from '@domain/aggregates-root';

export class Term {
	@Prop({ type: Date })
	acceptedAt!: Date;

	@Prop({ type: String })
	browser!: string;

	@Prop({ type: String })
	ip!: string;

	@Prop({ type: String })
	os!: string;

	@Prop({ type: String })
	termVersion!: string;
}

export type UserDocument = User & Document;

@Schema({ autoCreate: true, timestamps: true, autoIndex: true })
export class User {
	@Prop({
		type: String,
		required: true,
		index: true,
		immutable: true,
		unique: true
	})
	readonly id!: string;

	@Prop({ type: String, required: true, index: true })
	email!: string;

	@Prop({ type: String, required: true })
	password!: string;

	@Prop({ required: true, enum: Roles })
	role!: Role;

	@Prop({ type: Boolean, required: true })
	isActive!: boolean;

	@Prop({ type: Boolean, required: true })
	isTheEmailConfirmed!: boolean;

	@Prop({ type: Date, default: new Date() })
	createdAt!: Date;

	@Prop({ type: Date, default: new Date() })
	updatedAt!: Date;

	@Prop({ type: [{ type: Object }] })
	terms!: Term[];
}

export const UserSchema = SchemaFactory.createForClass(User);
