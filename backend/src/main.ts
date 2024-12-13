import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Moralis from 'moralis';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');
  try {
    await Moralis.start({
      apiKey: configService.get<string>('MORALIS_API_KEY'),
    });

    const config = new DocumentBuilder()
      .setTitle('Balance API')
      .setDescription(
        'API to fetch native balances and token balances using Moralis SDK',
      )
      .setVersion('1.0')
      .addTag('balance')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
    logger.log(`Application is running on: ${await app.getUrl()}`);
    logger.log(`Swagger UI available at: ${await app.getUrl()}/api`);
  } catch (error) {
    logger.error('Failed to initialize Moralis SDK', error.stack);
    process.exit(1);
  }
}
bootstrap();
