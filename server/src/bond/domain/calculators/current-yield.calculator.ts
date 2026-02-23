/**
 * current-yield.calculator.ts
 *
 * Computes the Current Yield of a bond.
 *
 * Financial context:
 * Current yield measures the annual income return of a bond relative
 * to its current market price. Unlike YTM, it ignores capital gains/losses
 * and the time value of money — it is a simple income-only metric.
 *
 * Formula:
 *   currentYield = annualCoupon / marketPrice
 *
 * Where:
 *   annualCoupon = faceValue × couponRate / 100
 *
 * Returns a decimal (e.g., 0.0526 for 5.26%).
 *
 * No NestJS imports — pure domain logic.
 */

import type { BondInput } from '../types/index.js';

/**
 * Calculates the current yield of a bond.
 *
 * @param input - Validated bond parameters
 * @returns Current yield as a decimal (e.g., 0.0526 = 5.26%)
 *
 * @example
 * // 1000 face, 5% rate, market price 950
 * calculateCurrentYield({ faceValue: 1000, couponRate: 5, marketPrice: 950, ... })
 * // → 0.05263...
 */
export function calculateCurrentYield(input: BondInput): number {
    const { faceValue, couponRate, marketPrice } = input;
    const annualCoupon: number = faceValue * couponRate / 100;
    return annualCoupon / marketPrice;
}
