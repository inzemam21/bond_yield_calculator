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

            if (!response.ok || !json.success) {
                // Backend class-validator may return an array of messages
                const errorMsgs = Array.isArray(json.message) ? json.message : [json.error || 'Server error'];
                setErrors(errorMsgs);
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
