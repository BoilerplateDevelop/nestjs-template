import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ResponseStatus } from '../types/response.type';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: Logger,
  ) {
    this.logger = new Logger(AllExceptionFilter.name);
  }

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    let httpStatus: HttpStatus;
    let message: string | string[];

    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      message = (exception.getResponse() as any)?.message;
    } else {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception.message;
    }

    this.logger.error(`Error - ${message}`);

    const responseBody = {
      status: httpStatus >= 500 ? ResponseStatus.ERROR : ResponseStatus.FAIL,
      message,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
