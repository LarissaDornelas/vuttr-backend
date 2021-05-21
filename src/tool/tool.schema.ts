import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ToolDocument = Tool & Document;

@Schema()
export class Tool {
  _id: string;
  
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  link: string;

  @Prop()
  description: string;

  @Prop([String])
  tags: string[];
}

export const ToolSchema = SchemaFactory.createForClass(Tool);
