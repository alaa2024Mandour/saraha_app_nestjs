import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from 'config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(config().PORT ?? 3000);
  console.log(`DB connected successfully on port ${ config().PORT ?? 3000}`);
}
bootstrap();
