/**
 * bond.module.ts
 *
 * NestJS feature module that encapsulates all bond-related providers.
 * Registers the BondController and BondService within the module scope.
 *
 * The domain layer (calculators, entities, types) is NOT registered here
 * because it consists of pure functions and plain classes — no DI needed.
 */

import { Module } from '@nestjs/common';
import { BondController } from './controllers/bond.controller.js';
import { BondService } from './services/bond.service.js';

@Module({
    controllers: [BondController],
    providers: [BondService],
})
export class BondModule { }
