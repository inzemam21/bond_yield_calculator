/**
 * main.ts
 *
 * NestJS application bootstrap.
 *
 * Configures:
 * - Global API prefix: /api
 * - Global ValidationPipe (class-validator + class-transformer)
 * - CORS for the React frontend dev server
 */

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';
import { appConfig } from './config/index.js';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  // Global API prefix: all routes under /api/*
  app.setGlobalPrefix(appConfig.apiPrefix);

  // Global validation pipe: validates DTOs using class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // CORS: allow React dev server
  app.enableCors({
    origin: appConfig.corsOrigins,
  });

  await app.listen(appConfig.port);
}

bootstrap();
