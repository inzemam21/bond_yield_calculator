/**
 * cash-flow-schedule.calculator.ts
 *
 * Generates a period-by-period cash flow schedule for a bond.
 *
 * Financial context:
 * The cash-flow schedule itemizes every payment the bondholder receives
 * over the life of the bond. For each coupon period it records:
 * - The payment date (incremented by 12 or 6 months per frequency)
 * - The coupon payment received
 * - The running total of interest earned
 * - The remaining outstanding principal
 *
 * On the final period, the face value is repaid (principal repayment),
 * reducing remainingPrincipal to 0.
 *
 * No NestJS imports — pure domain logic.
 */

import type { BondInput, CashFlowRow, CalculationContext } from '../types/index.js';

/**
 * Calculates the number of months between coupon payments.
 *
 * @param frequency - Payments per year (1 = annual, 2 = semi-annual)
 * @returns Months between payments (12 or 6)
 */
function monthsPerPeriod(frequency: number): number {
    return 12 / frequency;
}

/**
 * Advances a date by a given number of months.
 * Creates a new Date instance — no mutation.
 *
 * @param date   - Starting date
 * @param months - Number of months to advance
 * @returns New Date advanced by the specified months
 */
function addMonths(date: Date, months: number): Date {
    const result: Date = new Date(date.getTime());
    result.setMonth(result.getMonth() + months);
    return result;
}

/**
 * Generates the full cash-flow schedule for a bond.
 *
 * For each period:
 * - Payment date increments by 12 months (annual) or 6 months (semi-annual)
 * - Coupon payment is constant across all periods
 * - Cumulative interest is a running total
 * - Remaining principal equals faceValue until the final period, where
 *   the principal is repaid and remainingPrincipal drops to 0
 *
 * @param input   - Validated bond parameters
 * @param context - Pre-computed calculation context
 * @returns Array of CashFlowRow, one per coupon period
 *
 * @example
 * // 1000 face, 5% semi-annual, 2 years → 4 rows
 * generateCashFlowSchedule(input, context)
 * // → [{ period: 1, couponPayment: 25, ... }, ..., { period: 4, remainingPrincipal: 0 }]
 */
export function generateCashFlowSchedule(
    input: BondInput,
    context: CalculationContext,
): CashFlowRow[] {
    const { faceValue } = input;
    const { couponPayment, totalPeriods, frequency } = context;

    const schedule: CashFlowRow[] = [];
    const months: number = monthsPerPeriod(frequency);
    const startDate: Date = new Date();
    let cumulativeInterest: number = 0;

    for (let period = 1; period <= totalPeriods; period++) {
        cumulativeInterest += couponPayment;

        const isFinalPeriod: boolean = period === totalPeriods;
        const remainingPrincipal: number = isFinalPeriod ? 0 : faceValue;

        const row: CashFlowRow = {
            period,
            paymentDate: addMonths(startDate, months * period),
            couponPayment,
            cumulativeInterest,
            remainingPrincipal,
        };

        schedule.push(row);
    }

    return schedule;
}
