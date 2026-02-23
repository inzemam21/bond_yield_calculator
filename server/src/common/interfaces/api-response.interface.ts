/**
 * api-response.interface.ts
 *
 * RESPONSIBILITY:
 * Defines a consistent API response envelope used by all controllers.
 * Ensures every endpoint returns a predictable shape.
 */

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    timestamp: string;
}
