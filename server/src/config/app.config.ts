/**
 * app.config.ts
 *
 * RESPONSIBILITY:
 * Centralizes application-level configuration constants.
 * All environment-dependent values and tuneable parameters
 * should be defined here rather than scattered across the codebase.
 *
 * TODO: Integrate with NestJS ConfigModule when environment
 * variable management is needed.
 */

export const appConfig = {
    /** Default port for the HTTP server, defaulting to 3000 but allowing environment variable for Railway */
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,

    /** API version prefix */
    apiPrefix: 'api',

    /** CORS origin whitelist (for frontend dev server) */
    corsOrigins: ['http://localhost:5173'],
} as const;
