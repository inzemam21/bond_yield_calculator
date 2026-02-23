/**
 * bond.service.ts
 *
 * RESPONSIBILITY (Application Layer):
 * Orchestrates the bond calculation workflow:
 *   1. Maps the incoming DTO to domain-level BondInput
 *   2. Builds a CalculationContext from the input
 *   3. Calls individual domain calculators
 *   4. Assembles and returns the complete BondResult
 *
 * RULES:
 * - May import NestJS decorators (Injectable) for DI wiring.
 * - Must NOT contain financial formulas — delegates to domain layer.
 * - Must NOT access HTTP request/response objects.
 */

import { Injectable } from '@nestjs/common';
import { CalculateBondDto, CouponFrequencyDto } from '../dto/index.js';
import { CouponFrequency } from '../domain/types/coupon-frequency.enum.js';
import type { BondInput, BondResult } from '../domain/types/index.js';
import {
    buildCalculationContext,
    calculateCurrentYield,
    calculateYieldToMaturity,
    calculateTotalInterest,
    calculatePremiumDiscount,
    generateCashFlowSchedule,
} from '../domain/calculators/index.js';

@Injectable()
export class BondService {
    /**
     * Executes the full bond calculation pipeline.
     *
     * @param dto - Validated request data from the controller
     * @returns Complete BondResult (yields + cash flow schedule)
     */
    calculate(dto: CalculateBondDto): BondResult {
        // Step 1: Map DTO → domain BondInput
        const input: BondInput = this.mapToDomainInput(dto);

        // Step 2: Build shared CalculationContext
        const context = buildCalculationContext(input);

        // Step 3: Run each calculator
        const currentYield = calculateCurrentYield(input);
        const ytm = calculateYieldToMaturity(input, context);
        const totalInterest = calculateTotalInterest(context);
        const premiumOrDiscount = calculatePremiumDiscount(input);
        const cashFlows = generateCashFlowSchedule(input, context);

        // Step 4: Assemble BondResult
        return {
            currentYield,
            ytm,
            totalInterest,
            premiumOrDiscount,
            cashFlows,
        };
    }

    /**
     * Maps a validated DTO to a domain-level BondInput.
     * Converts the string enum (CouponFrequencyDto) to the numeric
     * domain enum (CouponFrequency).
     */
    private mapToDomainInput(dto: CalculateBondDto): BondInput {
        const frequencyMap: Record<CouponFrequencyDto, CouponFrequency> = {
            [CouponFrequencyDto.ANNUAL]: CouponFrequency.ANNUAL,
            [CouponFrequencyDto.SEMI_ANNUAL]: CouponFrequency.SEMI_ANNUAL,
        };

        return {
            faceValue: dto.faceValue,
            couponRate: dto.couponRate,
            marketPrice: dto.marketPrice,
            yearsToMaturity: dto.yearsToMaturity,
            couponFrequency: frequencyMap[dto.couponFrequency],
        };
    }
}
