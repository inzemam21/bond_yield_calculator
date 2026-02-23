import { calculateYieldToMaturity } from './src/bond/domain/calculators/yield-to-maturity.calculator.js';
import { buildCalculationContext } from './src/bond/domain/calculators/context.builder.js';

// Try 40% coupon rate with some typical bond parameters
const input = {
    faceValue: 1000,
    couponRate: 40,
    marketPrice: 950,
    yearsToMaturity: 10,
    couponFrequency: 2 // 2 periods per year
};

try {
    const context = buildCalculationContext(input);
    const ytm = calculateYieldToMaturity(input, context);
    console.log("SUCCESS:", ytm);
} catch (e) {
    console.error("FAILED:", e.message);
}
