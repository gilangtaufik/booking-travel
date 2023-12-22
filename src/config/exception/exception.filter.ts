import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException | any, host: ArgumentsHost) {
        console.log(exception);
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        console.log(exception?.response)
        response
            .status(status)
            .json({
                statusCode: exception?.response?.statusCode.toString() || 'ERR500',
                errorMessage: exception?.response?.error || 'Internal Server Error!',
                message: exception?.response?.message || [],
                timestamp: new Date().toISOString(),
            });
    }
}