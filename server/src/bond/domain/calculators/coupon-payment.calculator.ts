/**
 * coupon-payment.calculator.ts
 *
 * Computes the fixed coupon payment amount per period.
 *
 * Financial context:
 * A bond's coupon payment is the periodic interest the issuer pays
 * to the bondholder. The annual coupon is split evenly across the
 * payment frequency (e.g., halved for semi-annual bonds).
 *
 * Formula:
 *   couponPayment = (faceValue × couponRate / 100) / frequency
 *
 * No NestJS imports — pure domain logic.
 */

import type { BondInput } from '../types/index.js';

/**
 * Calculates the coupon payment per period.
 *
 * @param input - Validated bond parameters
 * @returns Coupon payment in currency units per period
 *
 * @example
 * // 1000 face, 5% rate, semi-annual → 25 per period
 * calculateCouponPayment({ faceValue: 1000, couponRate: 5, ..., couponFrequency: 2 })
 * // → 25
 */
export function calculateCouponPayment(input: BondInput): number {
    const { faceValue, couponRate, couponFrequency } = input;
    return (faceValue * couponRate / 100) / couponFrequency;
}
