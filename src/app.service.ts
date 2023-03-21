import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image, ImageDocument } from './image.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Image.name) private imageModel: Model<ImageDocument>,
  ) {}

  async create(name: string, content: string, url: string): Promise<Image> {
    const createdImage = new this.imageModel({
      name,
      content,
      url,
    });

    return createdImage.save();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
