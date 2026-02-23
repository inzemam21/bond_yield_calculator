/**
 * coupon-frequency.enum.ts
 *
 * Defines the coupon payment schedule of a bond.
 *
 * In fixed-income securities, coupons are paid at regular intervals.
 * The frequency determines how often the bondholder receives interest
 * payments and directly affects per-period coupon amounts and the
 * number of total periods used in yield calculations.
 *
 * @example
 * - ANNUAL (1):      1 payment per year  → period coupon = annual coupon
 * - SEMI_ANNUAL (2): 2 payments per year → period coupon = annual coupon / 2
 */

/** No NestJS imports — pure domain type. */

export enum CouponFrequency {
    /** Bond pays interest once per year */
    ANNUAL = 1,

    /** Bond pays interest twice per year (every 6 months) */
    SEMI_ANNUAL = 2,
}
