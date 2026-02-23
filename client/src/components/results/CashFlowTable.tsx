import type { CashFlowRow } from '../../types/api.types.js';
import { formatCurrency, formatDate } from '../../utils/formatters.ts';

interface CashFlowTableProps {
    schedule: CashFlowRow[];
}

export function CashFlowTable({ schedule }: CashFlowTableProps) {
    return (
        <div className="card animate-fade-in">
            <h2 className="card-title">Cash Flow Schedule</h2>

            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Period</th>
                            <th style={{ textAlign: 'left' }}>Date</th>
                            <th>Coupon</th>
                            <th>Cumulative Interest</th>
                            <th>Principal Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedule.map((row) => (
                            <tr key={row.period}>
                                <td style={{ textAlign: 'center' }}>{row.period}</td>
                                <td style={{ textAlign: 'left' }}>{formatDate(row.paymentDate)}</td>
                                <td>{formatCurrency(row.couponPayment)}</td>
                                <td>{formatCurrency(row.cumulativeInterest)}</td>
                                <td>{formatCurrency(row.remainingPrincipal)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
