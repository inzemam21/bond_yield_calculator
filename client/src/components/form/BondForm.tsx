import React, { useState } from 'react';
import { InputField } from './InputField.tsx';
import { Button } from '../ui/Button.tsx';
import type { CalculateBondDto } from '../../types/api.types.js';

interface BondFormProps {
    onSubmit: (data: CalculateBondDto) => void;
    isLoading: boolean;
}

export function BondForm({ onSubmit, isLoading }: BondFormProps) {
    const [formData, setFormData] = useState<CalculateBondDto>({
        faceValue: 1000,
        couponRate: 5,
        marketPrice: 950,
        yearsToMaturity: 10,
        couponFrequency: 'semi-annual',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="card">
            <h2 className="card-title">Bond Parameters</h2>
            <form onSubmit={handleSubmit}>
                <InputField
                    label="Face Value ($)"
                    name="faceValue"
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    value={formData.faceValue}
                    onChange={handleChange}
                    hint="The par value of the bond."
                />

                <InputField
                    label="Coupon Rate (%)"
                    name="couponRate"
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    required
                    value={formData.couponRate}
                    onChange={handleChange}
                    hint="Annual interest rate."
                />

                <InputField
                    label="Market Price ($)"
                    name="marketPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    value={formData.marketPrice}
                    onChange={handleChange}
                    hint="Current trading price."
                />

                <InputField
                    label="Years to Maturity"
                    name="yearsToMaturity"
                    type="number"
                    min="1"
                    step="1"
                    required
                    value={formData.yearsToMaturity}
                    onChange={handleChange}
                />

                <div className="form-group">
                    <label className="form-label">Payment Frequency</label>
                    <select
                        className="form-select"
                        name="couponFrequency"
                        value={formData.couponFrequency}
                        onChange={handleChange}
                    >
                        <option value="annual">Annual</option>
                        <option value="semi-annual">Semi-Annual</option>
                    </select>
                </div>

                <Button type="submit" isLoading={isLoading} style={{ marginTop: '1rem' }}>
                    Calculate Yields
                </Button>
            </form>
        </div>
    );
}
