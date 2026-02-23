/**
 * app.module.ts
 *
 * RESPONSIBILITY:
 * Root NestJS module. Imports all feature modules.
 * Does NOT contain any controllers or providers directly —
 * those are encapsulated within their respective feature modules.
 */

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BondModule } from './bond/bond.module.js';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'client', 'dist'), // Client build artifacts
      exclude: ['/api/(.*)'], // Don't serve static files for API routes
    }),
    BondModule,
  ],
})
export class AppModule { }
