/**
 * formatters.ts
 *
 * Pure functions for formatting numbers as currencies and percentages.
 */

/**
 * Formats a number as USD currency.
 */
export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}

/**
 * Formats a decimal as a percentage (e.g., 0.0526 -> 5.26%).
 */
export function formatPercentage(decimal: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(decimal);
}

/**
 * Formats an ISO date string to a localized short date (e.g., Aug 23, 2026).
 */
export function formatDate(isoString: string): string {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(new Date(isoString));
}
