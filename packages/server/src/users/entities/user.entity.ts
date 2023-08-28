import { Prop, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = Document;

export class User {
  @Prop()
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
