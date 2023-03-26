import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image, ImageDocument } from './image.schema';
import { ImageInnerType } from './types';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Image.name) private imageModel: Model<ImageDocument>,
  ) {}

  /**
   * 上传图片的接口，在数据库中创建新的数据
   * **/
  async create(imageData: ImageInnerType): Promise<Image> {
    const createdImage = new this.imageModel(imageData);

    return createdImage.save();
  }

  /**
   * 测试接口
   * **/
  getHello(): string {
    return 'Hello World!';
  }
}
