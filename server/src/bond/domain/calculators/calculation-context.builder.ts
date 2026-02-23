/**
 * calculation-context.builder.ts
 *
 * Builds a CalculationContext from a BondInput.
 *
 * The context pre-computes values that are shared across multiple
 * calculators, avoiding redundant math in each individual function.
 *
 * No NestJS imports — pure domain logic.
 */

import type { BondInput, CalculationContext } from '../types/index.js';
import { calculateCouponPayment } from './coupon-payment.calculator.js';

/**
 * Creates a CalculationContext from validated bond input.
 *
 * @param input - Validated bond parameters
 * @returns Pre-computed context for use by all calculators
 *
 * @example
 * const ctx = buildCalculationContext({
 *   faceValue: 1000, couponRate: 5, marketPrice: 950,
 *   yearsToMaturity: 10, couponFrequency: CouponFrequency.SEMI_ANNUAL,
 * });
 * // → { couponPayment: 25, totalPeriods: 20, periodRateGuess: 0.025, frequency: 2 }
 */
export function buildCalculationContext(input: BondInput): CalculationContext {
    const { couponRate, yearsToMaturity, couponFrequency } = input;

    const frequency: number = couponFrequency;
    const couponPayment: number = calculateCouponPayment(input);
    const totalPeriods: number = yearsToMaturity * frequency;
    const periodRateGuess: number = (couponRate / 100) / frequency;

    return {
        couponPayment,
        totalPeriods,
        periodRateGuess,
        frequency,
    };
}
