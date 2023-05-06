import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {
    this.logger = new Logger(LoggingInterceptor.name);
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { method, originalUrl } = request;

    this.logger.log(`Start to call [${method}] ${originalUrl}`);

    return next.handle().pipe(
      tap((value) => {
        this.logger.log(`Finished to call [${method}] ${originalUrl}`);
        return value;
      }),
    );
  }
}
