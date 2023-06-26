import { HttpException } from '@nestjs/common';
import { ERROR } from './constants/error.message.constant';

export class CustomException extends HttpException {
  public error: ERROR;
  public message: any;
  public isSystemError?: boolean;

  constructor(error: ERROR, data?: any, isSystemError?: boolean) {
    super('CustomException', null);
    this.message = data;
    this.error = error;
    this.isSystemError = isSystemError;
  }
}
