import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ImageDocument = Image & Document;

@Schema()
export class Image {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: false })
  url: string;

  @Prop({ required: true })
  preview: string;

  @Prop({ required: true })
  createDate: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
