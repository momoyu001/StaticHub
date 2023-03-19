import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ImageDocument = Image & Document;

@Schema()
export class Image {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  createdDate: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
