/**
 * total-interest.calculator.ts
 *
 * Computes the total coupon interest earned over the full life of a bond.
 *
 * Financial context:
 * Total interest is the sum of all periodic coupon payments the bondholder
 * receives from purchase to maturity. It does not include the principal
 * repayment at maturity.
 *
 * Formula:
 *   totalInterest = couponPayment × totalPeriods
 *
 * No NestJS imports — pure domain logic.
 */

import type { CalculationContext } from '../types/index.js';

/**
 * Calculates total interest earned over the bond's lifetime.
 *
 * @param context - Pre-computed calculation context
 * @returns Total interest in currency units
 *
 * @example
 * // couponPayment = 25, totalPeriods = 20
 * calculateTotalInterest(context) // → 500
 */
export function calculateTotalInterest(context: CalculationContext): number {
    const { couponPayment, totalPeriods } = context;
    return couponPayment * totalPeriods;
}
