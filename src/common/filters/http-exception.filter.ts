import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException | any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus ? exception.getStatus() : 500;
    let message = exception.message || 'Internal server error';

    if (exception.code === 'ENOENT') message = '404 Not Found';

    return response.status(status).json({
      statusCode: status,
      error: true,
      message,
      timestamp: new Date().toISOString(),
      path: request.baseUrl + request.url,
    });
  }
}
