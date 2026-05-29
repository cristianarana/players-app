import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse() as any;
      const status = exception.getStatus();

      return response.status(status).json({
        success: false,
        message: exceptionResponse.message || exception.message,
        error: status === HttpStatus.NOT_FOUND ? 'NOT_FOUND' : 'REQUEST_ERROR',
      });
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error interno del servidor',
      error: 'INTERNAL_SERVER_ERROR',
    });
  }
}
