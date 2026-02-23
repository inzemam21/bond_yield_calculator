/**
 * bond-input.type.ts
 *
 * Represents the validated input parameters required to perform
 * bond yield calculations. This is the **domain-level** input —
 * distinct from the HTTP DTO which is a transport concern.
 *
 * Financial context:
 * - faceValue (par value): The principal amount the issuer will repay
 *   at maturity. Typical values: 100, 1000, 10000.
 * - couponRate: The annual interest rate (as a percentage, e.g. 5 for 5%)
 *   that determines periodic coupon payments.
 * - marketPrice: The current trading price of the bond. When it differs
 *   from faceValue, the bond trades at a premium or discount.
 * - yearsToMaturity: The remaining time (in years) until the bond's
 *   principal is repaid. Must be > 0.
 * - couponFrequency: How often coupon payments are made per year.
 */

/** No NestJS imports — pure domain type. */

import { CouponFrequency } from './coupon-frequency.enum.js';

export interface BondInput {
    /**
     * Par (face) value of the bond in currency units.
     * @example 1000
     */
    readonly faceValue: number;

    /**
     * Annual coupon rate as a percentage.
     * @example 5 — represents 5% annual interest
     */
    readonly couponRate: number;

    /**
     * Current market price of the bond in currency units.
     * @example 950 — bond trading at a discount
     */
    readonly marketPrice: number;

    /**
     * Number of years remaining until the bond matures.
     * @example 10
     */
    readonly yearsToMaturity: number;

    /**
     * Frequency of coupon payments per year.
     * @example CouponFrequency.SEMI_ANNUAL
     */
    readonly couponFrequency: CouponFrequency;
}
