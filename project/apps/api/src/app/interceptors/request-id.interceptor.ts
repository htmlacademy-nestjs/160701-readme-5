import {
  CallHandler,
  ExecutionContext,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as crypto from 'crypto';
import { Request } from 'express';

export class RequestIdInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> {
    const requestId = crypto.randomUUID();
    const request = context.switchToHttp().getRequest<Request>();

    request.headers['X-Request-Id'] = requestId;
    Logger.log(
      `[${request.method}: ${request.url}]: RequestID is ${requestId}`
    );

    return next.handle();
  }
}
