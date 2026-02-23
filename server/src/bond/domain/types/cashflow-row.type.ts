/**
 * cashflow-row.type.ts
 *
 * Represents a single row in a bond's cash-flow schedule.
 *
 * Financial context:
 * A cash-flow schedule itemizes every coupon payment over the bond's life.
 * Each row tracks:
 * - Which period it belongs to (1-indexed)
 * - When the payment occurs
 * - The coupon amount received that period
 * - How much total interest has been earned so far
 * - How much of the face value principal remains outstanding
 *
 * The final row's remainingPrincipal should equal 0 (face value repaid
 * at maturity), and cumulativeInterest should equal totalInterest.
 */

/** No NestJS imports — pure domain type. */

export interface CashFlowRow {
    /**
     * 1-indexed period number within the bond's life.
     * Total periods = yearsToMaturity × couponFrequency.
     * @example 1
     */
    readonly period: number;

    /**
     * Date on which this coupon payment is made.
     * Calculated from the settlement date plus the period offset.
     */
    readonly paymentDate: Date;

    /**
     * Coupon payment received in this period (currency units).
     * Equal to (faceValue × couponRate / 100) / couponFrequency.
     * @example 25 — for a 1000 face, 5% annual, semi-annual bond
     */
    readonly couponPayment: number;

    /**
     * Running total of all coupon payments received up to
     * and including this period.
     * @example 75 — after 3 periods of $25 payments
     */
    readonly cumulativeInterest: number;

    /**
     * Outstanding principal balance after this period.
     * Remains equal to faceValue for all periods except the last,
     * where it drops to 0 upon principal repayment at maturity.
     * @example 1000
     */
    readonly remainingPrincipal: number;
}
