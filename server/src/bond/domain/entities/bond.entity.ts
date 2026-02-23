/**
 * bond.entity.ts
 *
 * RESPONSIBILITY:
 * Represents the Bond domain entity — the core data model
 * for a fixed-income bond instrument.
 *
 * This is a plain TypeScript class with no framework dependencies.
 * It holds the validated input parameters and can be extended with
 * derived property getters as the domain logic grows.
 *
 * RULES:
 * - No NestJS or framework imports allowed.
 * - Constructor performs assignment only — no side effects.
 * - All properties are readonly to enforce immutability.
 */

import { CouponFrequency } from '../types/coupon-frequency.enum.js';

export class Bond {
    /** Par (face) value of the bond */
    public readonly faceValue: number;

    /** Annual coupon rate as a percentage */
    public readonly couponRate: number;

    /** Current market price of the bond */
    public readonly marketPrice: number;

    /** Years remaining until maturity */
    public readonly yearsToMaturity: number;

    /** Coupon payment frequency */
    public readonly couponFrequency: CouponFrequency;

    constructor(
        faceValue: number,
        couponRate: number,
        marketPrice: number,
        yearsToMaturity: number,
        couponFrequency: CouponFrequency,
    ) {
        this.faceValue = faceValue;
        this.couponRate = couponRate;
        this.marketPrice = marketPrice;
        this.yearsToMaturity = yearsToMaturity;
        this.couponFrequency = couponFrequency;
    }
}
