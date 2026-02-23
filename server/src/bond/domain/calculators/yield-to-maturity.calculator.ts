/**
 * yield-to-maturity.calculator.ts
 *
 * Computes the Yield to Maturity (YTM) of a bond using Newton-Raphson
 * iterative root-finding.
 *
 * Financial context:
 * YTM is the total annualized return an investor earns if the bond is
 * held to maturity. It accounts for coupon payments, capital gain/loss,
 * and the time value of money. There is no closed-form solution, so we
 * solve numerically for the discount rate r that satisfies:
 *
 *   P = Σ(t=1..n) C/(1+r)^t  +  F/(1+r)^n
 *
 * Where:
 *   P = market price
 *   C = coupon payment per period
 *   F = face value
 *   r = yield per period (unknown — we solve for this)
 *   n = total number of periods
 *
 * Edge case — zero-coupon bonds (couponRate === 0):
 *   YTM = (F / P)^(1/n) - 1   (per-period rate, then annualized)
 *
 * Algorithm:
 *   Newton-Raphson with tolerance = 1e-7, maxIterations = 1000.
 *   f(r)  = Σ C/(1+r)^t + F/(1+r)^n - P
 *   f'(r) = Σ -t·C/(1+r)^(t+1) + -n·F/(1+r)^(n+1)
 *
 * No NestJS imports — pure domain logic.
 */

import type { BondInput, CalculationContext } from '../types/index.js';

/** Convergence tolerance for the Newton-Raphson solver */
const TOLERANCE: number = 1e-7;

/** Maximum iterations before the solver gives up */
const MAX_ITERATIONS: number = 1000;

/**
 * Bond price function: computes the theoretical price given a per-period rate.
 *
 * @param r       - Per-period yield rate guess
 * @param coupon  - Coupon payment per period
 * @param face    - Face value
 * @param periods - Total number of coupon periods
 * @returns Theoretical bond price at rate r
 */
function bondPrice(
    r: number,
    coupon: number,
    face: number,
    periods: number,
): number {
    let price: number = 0;
    for (let t = 1; t <= periods; t++) {
        price += coupon / Math.pow(1 + r, t);
    }
    price += face / Math.pow(1 + r, periods);
    return price;
}

/**
 * Derivative of the bond price function with respect to r.
 * Used by Newton-Raphson to compute the step direction.
 *
 * f'(r) = Σ(t=1..n) -t·C/(1+r)^(t+1) + -n·F/(1+r)^(n+1)
 *
 * @param r       - Per-period yield rate guess
 * @param coupon  - Coupon payment per period
 * @param face    - Face value
 * @param periods - Total number of coupon periods
 * @returns Derivative of bond price at rate r
 */
function bondPriceDerivative(
    r: number,
    coupon: number,
    face: number,
    periods: number,
): number {
    let derivative: number = 0;
    for (let t = 1; t <= periods; t++) {
        derivative += (-t * coupon) / Math.pow(1 + r, t + 1);
    }
    derivative += (-periods * face) / Math.pow(1 + r, periods + 1);
    return derivative;
}

/**
 * Computes YTM for a zero-coupon bond using the closed-form solution.
 *
 * Formula: periodRate = (F / P)^(1/n) - 1
 *
 * @param input   - Bond parameters (couponRate must be 0)
 * @param context - Pre-computed calculation context
 * @returns Annualized YTM as a decimal
 */
function zeroCouponYtm(input: BondInput, context: CalculationContext): number {
    const { faceValue, marketPrice } = input;
    const { totalPeriods, frequency } = context;
    const periodRate: number = Math.pow(faceValue / marketPrice, 1 / totalPeriods) - 1;
    return periodRate * frequency;
}

/**
 * Calculates the Yield to Maturity of a bond.
 *
 * Uses Newton-Raphson iteration for coupon-bearing bonds and a
 * closed-form formula for zero-coupon bonds.
 *
 * @param input   - Validated bond parameters
 * @param context - Pre-computed calculation context (couponPayment, totalPeriods, etc.)
 * @returns Annualized YTM as a decimal (e.g., 0.0612 = 6.12%)
 * @throws Error if Newton-Raphson fails to converge within MAX_ITERATIONS
 *
 * @example
 * // 1000 face, 5% semi-annual, 10 years, market price 950
 * calculateYieldToMaturity(input, context) // → ~0.0554
 */
export function calculateYieldToMaturity(
    input: BondInput,
    context: CalculationContext,
): number {
    const { faceValue, marketPrice, couponRate } = input;
    const { couponPayment, totalPeriods, frequency } = context;

    // Edge case: zero-coupon bond — use closed-form solution
    if (couponRate === 0) {
        return zeroCouponYtm(input, context);
    }

    // Initial guess: coupon rate per period
    let r: number = (couponRate / 100) / frequency;

    for (let i = 0; i < MAX_ITERATIONS; i++) {
        const price: number = bondPrice(r, couponPayment, faceValue, totalPeriods);
        const f: number = price - marketPrice;

        // Check convergence
        if (Math.abs(f) < TOLERANCE) {
            return r * frequency;
        }

        const fPrime: number = bondPriceDerivative(r, couponPayment, faceValue, totalPeriods);

        // Guard against division by zero in the derivative
        if (Math.abs(fPrime) < 1e-15) {
            break;
        }

        r = r - f / fPrime;
    }

    throw new Error(
        `YTM Newton-Raphson failed to converge after ${MAX_ITERATIONS} iterations`,
    );
}
