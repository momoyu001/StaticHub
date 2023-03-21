import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import { Image, ImageSchema } from './image.schema';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client/dist'),
    }),
    MulterModule.register({
      // 注册 Multer 中间件，指定了上传文件的保存路径，将保存到 uploads 目录
      dest: './uploads',
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/statichub'),
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
