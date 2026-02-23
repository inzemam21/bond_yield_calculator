/**
 * calculate-bond.dto.ts
 *
 * Data Transfer Object for the POST /api/bond/calculate request.
 *
 * This DTO defines the HTTP-layer contract — the shape the client sends.
 * NestJS ValidationPipe validates this DTO using class-validator decorators
 * before the request reaches the controller handler.
 *
 * Field-level validation errors are returned automatically as a 400 response.
 */

import {
    IsNumber,
    IsPositive,
    IsInt,
    Min,
    Max,
    IsEnum,
} from 'class-validator';

/**
 * Accepted string values for coupon frequency in the API request.
 * Mapped to the domain CouponFrequency enum in the service layer.
 */
export enum CouponFrequencyDto {
    ANNUAL = 'annual',
    SEMI_ANNUAL = 'semi-annual',
}

export class CalculateBondDto {
    /**
     * The par (face) value of the bond.
     * Must be a positive number.
     * @example 1000
     */
    @IsNumber({}, { message: 'faceValue must be a number' })
    @IsPositive({ message: 'faceValue must be greater than 0' })
    faceValue!: number;

    /**
     * Annual coupon rate as a percentage (0–100).
     * 0 is valid (zero-coupon bond).
     * @example 5
     */
    @IsNumber({}, { message: 'couponRate must be a number' })
    @Min(0, { message: 'couponRate must be at least 0' })
    @Max(100, { message: 'couponRate must not exceed 100' })
    couponRate!: number;

    /**
     * Current market price of the bond.
     * Must be a positive number.
     * @example 950
     */
    @IsNumber({}, { message: 'marketPrice must be a number' })
    @IsPositive({ message: 'marketPrice must be greater than 0' })
    marketPrice!: number;

    /**
     * Years remaining until the bond matures.
     * Must be a positive integer.
     * @example 10
     */
    @IsInt({ message: 'yearsToMaturity must be a positive integer' })
    @IsPositive({ message: 'yearsToMaturity must be greater than 0' })
    yearsToMaturity!: number;

    /**
     * How often coupons are paid: 'annual' or 'semi-annual'.
     * @example 'semi-annual'
     */
    @IsEnum(CouponFrequencyDto, {
        message: 'couponFrequency must be either "annual" or "semi-annual"',
    })
    couponFrequency!: CouponFrequencyDto;
}
