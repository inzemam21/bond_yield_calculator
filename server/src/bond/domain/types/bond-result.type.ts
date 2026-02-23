/**
 * bond-result.type.ts
 *
 * Contains the output types for bond yield calculations:
 * - BondResult: the complete result returned to consumers
 * - CalculationContext: internal pre-computed values shared across calculators
 */

/** No NestJS imports — pure domain types. */

import type { CashFlowRow } from './cashflow-row.type.js';

/**
 * Complete result of a bond yield calculation.
 *
 * Financial context:
 * - currentYield: Annual coupon income as a percentage of market price.
 *   Measures the income return without considering capital gains/losses.
 * - ytm (Yield to Maturity): The total annualized return if the bond is
 *   held to maturity, accounting for coupon payments, capital gain/loss,
 *   and the time value of money. Requires iterative numerical solving.
 * - totalInterest: Sum of all coupon payments over the bond's lifetime.
 * - premiumOrDiscount: Whether the bond trades above, below, or at par.
 * - cashFlows: Period-by-period breakdown of payments and balances.
 */
export interface BondResult {
    /**
     * Current yield as a percentage.
     * @example 5.26 — meaning 5.26%
     */
    readonly currentYield: number;

    /**
     * Yield to maturity as a percentage.
     * @example 6.12 — meaning 6.12%
     */
    readonly ytm: number;

    /**
     * Total coupon interest earned over the bond's full life (currency units).
     * @example 500 — for a 10-year, 5% annual, 1000-face bond
     */
    readonly totalInterest: number;

    /**
     * Classification of the bond's market price relative to face value.
     * - "premium":  marketPrice > faceValue
     * - "discount": marketPrice < faceValue
     * - "par":      marketPrice === faceValue
     */
    readonly premiumOrDiscount: 'premium' | 'discount' | 'par';

    /**
     * Full cash-flow schedule, one row per coupon period.
     */
    readonly cashFlows: CashFlowRow[];
}

/**
 * Pre-computed values derived from BondInput that multiple calculators share.
 *
 * This context object is built once in the service layer and passed into
 * each calculator, avoiding redundant recomputation of common values.
 *
 * Financial context:
 * - couponPayment: The fixed currency amount paid each period.
 * - totalPeriods: Total number of coupon payments over the bond's life.
 * - periodRateGuess: An initial estimate for iterative YTM solvers.
 * - frequency: The coupon frequency (payments per year), carried through
 *   for calculators that need to annualize period rates.
 */
export interface CalculationContext {
    /**
     * Coupon payment per period in currency units.
     * = (faceValue × couponRate / 100) / frequency
     * @example 25 — for a 1000 face, 5% rate, semi-annual bond
     */
    readonly couponPayment: number;

    /**
     * Total number of coupon periods over the bond's life.
     * = yearsToMaturity × frequency
     * @example 20 — for a 10-year, semi-annual bond
     */
    readonly totalPeriods: number;

    /**
     * Initial guess for the per-period yield rate, used as a starting
     * point for iterative YTM solvers (e.g. Newton-Raphson).
     * Typically derived from the current yield divided by frequency.
     */
    readonly periodRateGuess: number;

    /**
     * Coupon payments per year (numeric value of CouponFrequency).
     * @example 2 — for semi-annual
     */
    readonly frequency: number;
}
