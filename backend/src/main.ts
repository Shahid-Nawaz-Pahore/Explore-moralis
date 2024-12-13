import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Moralis from 'moralis';

async function bootstrap() {
  await Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
  });
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
