import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger, ExecutionContext, } from '@nestjs/common';
import { Request, Response } from 'express';
import { Reflector } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const isHealthCheck = request.url.includes('/health');

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? this.extractMessage(exception.getResponse())
        : (exception as any)?.message || 'Internal server error';

    if (isHealthCheck) {
      this.logger.log(`Health check error: ${request.url} - ${status}`);

      const errorResponse = exception instanceof HttpException
        ? exception.getResponse()
        : { message: 'Internal server error' };

      return response.status(status).json(errorResponse);
    }

    const stack =
      exception instanceof Error
        ? exception.stack
        : undefined;

    this.logger.error({
      path: request.url,
      method: request.method,
      statusCode: status,
      message,
      stack,
    });

    response.status(status).json({
      success: false,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }

  private extractMessage(response: any): string {
    if (typeof response === 'string') return response;

    if (typeof response === 'object') {
      if (response.message) {
        return Array.isArray(response.message)
          ? response.message.join(', ')
          : response.message;
      }
      return JSON.stringify(response);
    }

    return 'Unknown error';
  }
}
