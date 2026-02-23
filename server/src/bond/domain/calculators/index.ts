/**
 * Barrel export for all domain calculators.
 *
 * Each calculator is a pure function with a single responsibility.
 * The context builder creates the shared CalculationContext
 * consumed by calculators that need pre-computed values.
 */

// Shared context
export { buildCalculationContext } from './calculation-context.builder.js';

// Individual calculators
export { calculateCouponPayment } from './coupon-payment.calculator.js';
export { calculateCurrentYield } from './current-yield.calculator.js';
export { calculateYieldToMaturity } from './yield-to-maturity.calculator.js';
export { calculateTotalInterest } from './total-interest.calculator.js';
export { calculatePremiumDiscount } from './premium-discount.calculator.js';
export { generateCashFlowSchedule } from './cash-flow-schedule.calculator.js';
