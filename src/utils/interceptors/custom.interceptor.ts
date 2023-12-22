import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

export interface Response<T> {
 statusCode: number;
 message: string;
 data: T;
}

@Injectable()
export class CustomTransformInterceptor<T> implements NestInterceptor<T, 
Response<T>> {


constructor(private reflector: Reflector) {}
intercept(context: ExecutionContext, next: CallHandler): 
Observable<Response<T>> {
   return next.handle().pipe(
   map((data) => (
    {
    message: this.reflector.get<string>('response_message', 
      context.getHandler()) || data.message || 'Success',
    statusCode: context.switchToHttp().getResponse().statusCode.toString() || '200',
    data: data.result || data,
   }))
   );

 }
}