import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ToolDocument = Tool & Document;

@Schema()
export class Tool {
  _id: string;

  @Prop({ required: true, text: true })
  title: string;

  @Prop({ required: true, text: true })
  link: string;

  @Prop({ text: true })
  description: string;

  @Prop({ text: true })
  tags: string[];
}

export const ToolSchema = SchemaFactory.createForClass(Tool);
