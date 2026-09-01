
import { ValidationPipe } from '@nestjs/common';

import { NestFactory } from '@nestjs/core';

import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ==========================================
  // API PREFIX
  // ==========================================
  app.setGlobalPrefix('api/v1');

  // ==========================================
  // CORS
  // ==========================================
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  // ==========================================
  // GLOBAL VALIDATION
  // ==========================================
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // ==========================================
  // SWAGGER
  // ==========================================
  const config = new DocumentBuilder()
    .setTitle('Indonesia Activity Center API')
    .setDescription(
      'REST API for Indonesia Activity Center',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(
    app,
    config,
    {
      ignoreGlobalPrefix: false,
    },
  );

  SwaggerModule.setup(
    'docs',
    app,
    document,
  );

  // ==========================================
  // SERVER
  // ==========================================
  await app.listen(
    process.env.PORT ?? 4000,
  );
}

bootstrap();

