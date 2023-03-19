import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 启用跨域访问
  app.enableCors({
    origin: true, // true - 允许所有来源的请求
    credentials: true, // 允许发送 Cookie 等凭证
  });
  // 使用 app.use 注册中间件
  app.use(bodyParser.json({ limit: '50mb' })); // 解析请求体中的 JSON 格式数据，请求体中的数据大小不超过 50 mb
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // 解析请求体中的 URL-encoded 格式数据，请求体中的数据大小不超过 50 mb
  await app.listen(3000, () => {
    console.log('server is listening on port http://localhost:3000');
  });
}
bootstrap();
