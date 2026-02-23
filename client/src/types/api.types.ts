/**
 * api.types.ts
 *
 * Mirrors the backend DTO and Result types.
 * Pure TypeScript interfaces — NO logic here.
 */

export type CouponFrequencyDto = 'annual' | 'semi-annual';

export interface CalculateBondDto {
    faceValue: number;
    couponRate: number;
    marketPrice: number;
    yearsToMaturity: number;
    couponFrequency: CouponFrequencyDto;
}

export interface CashFlowRow {
    period: number;
    paymentDate: string; // ISO string from JSON
    couponPayment: number;
    cumulativeInterest: number;
    remainingPrincipal: number;
}

export interface BondResult {
    currentYield: number;     // e.g. 0.0526
    ytm: number;              // e.g. 0.0612
    totalInterest: number;
    premiumOrDiscount: 'premium' | 'discount' | 'par';
    cashFlows: CashFlowRow[];
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string | string[]; // class-validator error array
    timestamp: string;
}
