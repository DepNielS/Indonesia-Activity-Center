import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //API VERSIONING (1)
  app.setGlobalPrefix('api/v1'); 

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted:true,
    }),
  );

  await app.listen(process.env.PORT ?? 4000);
}

bootstrap();