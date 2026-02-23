/**
 * useBondCalculator.ts
 *
 * Custom React hook managing the API lifecycle for bond calculations.
 * Responsible for:
 * 1. Holding state (loading, error, data)
 * 2. Sending POST request to backend
 * 3. Handling validation errors returning from the API.
 *
 * NO financial calculation logic lives here.
 */

import { useState } from 'react';
import type { CalculateBondDto, BondResult, ApiResponse } from '../types/api.types.js';

interface UseBondCalculatorReturn {
    calculate: (data: CalculateBondDto) => Promise<void>;
    isLoading: boolean;
    result: BondResult | null;
    errors: string[];
}

export function useBondCalculator(): UseBondCalculatorReturn {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<BondResult | null>(null);
    const [errors, setErrors] = useState<string[]>([]);

    const calculate = async (data: CalculateBondDto): Promise<void> => {
        setIsLoading(true);
        setErrors([]);
        setResult(null);

        try {
            // Use an environment variable for API URL or default to the relative path
            const apiUrl = import.meta.env.VITE_API_URL || '/api/bond/calculate';

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const json = await response.json() as ApiResponse<BondResult>;

            if (!response.ok) {
                // Backend class-validator natively returns 400 Bad Request in this shape:
                // { "message": ["error 1"], "error": "Bad Request", "statusCode": 400 }
                // And our custom HttpFilter might not be catching validation errors yet, 
                // hence there is no 'success: false' wrapper.
                let errorMsgs: string[] = [];
                if (Array.isArray(json.message)) {
                    errorMsgs = json.message as string[];
                } else if (typeof json.message === 'string') {
                    errorMsgs = [json.message];
                } else if (typeof json.error === 'string') {
                    errorMsgs = [json.error];
                } else {
                    errorMsgs = ['Server error'];
                }

                setErrors(errorMsgs);
                return;
            }

            if (!json.success) {
                // If it IS wrapped in our ApiResponse but is not successful
                setErrors([json.message as unknown as string || 'Server error']);
                return;
            }

            setResult(json.data!);

        } catch (err: unknown) {
            setErrors([err instanceof Error ? err.message : 'Network error']);
        } finally {
            setIsLoading(false);
        }
    };

    return { calculate, isLoading, result, errors };
}
