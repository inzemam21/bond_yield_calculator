/**
 * premium-discount.calculator.ts
 *
 * Classifies a bond as trading at a Premium, Discount, or Par
 * relative to its face (par) value.
 *
 * Financial context:
 * - Premium:  The bond trades above face value. Typically occurs when
 *             the coupon rate exceeds prevailing market interest rates.
 * - Discount: The bond trades below face value. Typically occurs when
 *             the coupon rate is lower than prevailing market rates.
 * - Par:      The bond trades exactly at face value.
 *
 * Formula:
 *   marketPrice > faceValue → "premium"
 *   marketPrice < faceValue → "discount"
 *   marketPrice === faceValue → "par"
 *
 * No NestJS imports — pure domain logic.
 */

import type { BondInput } from '../types/index.js';

/**
 * Determines whether the bond trades at a premium, discount, or par.
 *
 * @param input - Validated bond parameters
 * @returns 'premium' | 'discount' | 'par'
 *
 * @example
 * calculatePremiumDiscount({ marketPrice: 1050, faceValue: 1000, ... }) // → 'premium'
 * calculatePremiumDiscount({ marketPrice: 950, faceValue: 1000, ... })  // → 'discount'
 * calculatePremiumDiscount({ marketPrice: 1000, faceValue: 1000, ... }) // → 'par'
 */
export function calculatePremiumDiscount(
    input: BondInput,
): 'premium' | 'discount' | 'par' {
    const { marketPrice, faceValue } = input;

    if (marketPrice > faceValue) {
        return 'premium';
    }

    if (marketPrice < faceValue) {
        return 'discount';
    }

    return 'par';
}
