import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema()
export class Room extends Document {
  @Prop()
  name: string;

  @Prop({ required: false, default: null })
  image?: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
