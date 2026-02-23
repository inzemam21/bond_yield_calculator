/**
 * http-exception.filter.ts
 *
 * RESPONSIBILITY:
 * Global NestJS exception filter that catches all HTTP exceptions
 * and formats them into a consistent ApiResponse envelope.
 *
 * This ensures every error response has the same shape as success responses.
 *
 * TODO: Implement when validation/error handling phase begins.
 */

import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';
import type { Response } from 'express';
import type { ApiResponse } from '../interfaces/index.js';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        const body: ApiResponse<null> = {
            success: false,
            error: exception.message,
            timestamp: new Date().toISOString(),
        };

        response.status(status).json(body);
    }
}
