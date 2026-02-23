/**
 * bond.controller.ts
 *
 * RESPONSIBILITY (Transport Layer):
 * Handles HTTP requests for bond calculations.
 *   1. Receives the incoming request body
 *   2. DTO is validated automatically by the global ValidationPipe
 *   3. Delegates to BondService
 *   4. Wraps the result in a consistent ApiResponse envelope
 *
 * RULES:
 * - Must NOT contain any business logic or formulas.
 * - Must NOT call domain calculators directly — goes through the service.
 * - Handles only HTTP concerns: status codes, response shape, routing.
 */

import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { BondService } from '../services/bond.service.js';
import { CalculateBondDto } from '../dto/index.js';
import type { ApiResponse } from '../../common/interfaces/index.js';
import type { BondResult } from '../domain/types/index.js';

@Controller('bond')
export class BondController {
    constructor(private readonly bondService: BondService) { }

    /**
     * POST /api/bond/calculate
     *
     * Accepts bond parameters, validates via DTO,
     * delegates to BondService, and returns yield metrics + cash-flow schedule.
     *
     * @param dto - Validated CalculateBondDto (auto-validated by global pipe)
     * @returns ApiResponse wrapping BondResult
     */
    @Post('calculate')
    @HttpCode(HttpStatus.OK)
    calculate(@Body() dto: CalculateBondDto): ApiResponse<BondResult> {
        const data: BondResult = this.bondService.calculate(dto);

        return {
            success: true,
            data,
            timestamp: new Date().toISOString(),
        };
    }
}
