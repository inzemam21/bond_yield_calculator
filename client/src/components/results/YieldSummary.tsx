import type { BondResult } from '../../types/api.types.js';
import { formatPercentage, formatCurrency } from '../../utils/formatters.ts';

interface YieldSummaryProps {
    result: BondResult;
}

export function YieldSummary({ result }: YieldSummaryProps) {
    const { currentYield, ytm, totalInterest, premiumOrDiscount } = result;

    return (
        <div className="card animate-fade-in" style={{ marginBottom: '2rem' }}>
            <h2 className="card-title">
                Yield Summary
                <span className={`badge ${premiumOrDiscount}`}>
                    {premiumOrDiscount}
                </span>
            </h2>

            <div className="results-grid">
                <div className="metric-card">
                    <div className="metric-label">Yield to Maturity (YTM)</div>
                    <div className="metric-value" style={{ color: 'var(--accent-color)' }}>
                        {formatPercentage(ytm)}
                    </div>
                </div>

                <div className="metric-card">
                    <div className="metric-label">Current Yield</div>
                    <div className="metric-value">
                        {formatPercentage(currentYield)}
                    </div>
                </div>

                <div className="metric-card">
                    <div className="metric-label">Total Interest</div>
                    <div className="metric-value">
                        {formatCurrency(totalInterest)}
                    </div>
                </div>
            </div>
        </div>
    );
}
