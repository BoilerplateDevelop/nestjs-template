import { ValidationError } from '@nestjs/common';
import { ERROR } from './exception/constants/error.message.constant';
import { CustomException } from './exception/custom.exception';

export enum EStatus {
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface GenericResponseInterface {
  status: 'success' | 'error';
  msg: string;
  rtnCode: string;
  data: any;
}

export function generateResponse(
  status: 'success' | 'error',
  data?: any,
  msg?: string,
  rtnCode?: string,
): GenericResponseInterface {
  const genericResponseInterface: GenericResponseInterface = {
    status,
    msg: EStatus.SUCCESS == status ? '' : msg,
    rtnCode: EStatus.SUCCESS == status ? '0' : rtnCode,
    data,
  };

  return genericResponseInterface;
}

export class ValidationErrorDataObj {
  property?: string;
  data: { msg?: string; rtnCode?: string }[] = [];
}

export function findValidationError(
  error: ValidationError,
  appName: string,
  errorDataObj: ValidationErrorDataObj,
): ValidationErrorDataObj {
  if (errorDataObj.property) {
    errorDataObj.property = errorDataObj.property.concat('.' + error.property);
  } else {
    errorDataObj.property = error.property;
  }

  if (error.children.length > 0) {
    const errorObj = error.children[0];
    findValidationError(errorObj, appName, errorDataObj);
  } else {
    const constraints = error.constraints;
    Object.entries(constraints).map((constraintObjProp) => {
      const errorJson = JSON.parse(constraintObjProp[1]);
      errorDataObj.data.push({
        msg: errorJson.message.replace(/%s/g, appName),
        rtnCode: 'E101' + errorJson.code,
      });
    });
  }
  return errorDataObj;
}

export function generateResponseERROR(
  error: ERROR,
  appName: string,
  data?: any,
): GenericResponseInterface {
  if (
    data &&
    typeof data === 'object' &&
    (data[0] as ValidationError)?.target != null &&
    (data[0] as ValidationError)?.property != null
  ) {
    data = data.map((e: ValidationError) => {
      const validationErrorDataObj = findValidationError(
        e,
        appName,
        new ValidationErrorDataObj(),
      );
      return {
        [validationErrorDataObj.property]: validationErrorDataObj.data,
      };
    });
  }

  const genericResponseInterface: GenericResponseInterface = {
    status: EStatus.ERROR,
    msg: error.MESSAGE.replace('%s', appName),
    rtnCode: error.CODE,
    data,
  };

  return genericResponseInterface;
}

export function getExceptionDetail(
  exception: any,
  appName: string,
): { msg: string; rtnCode: string } {
  if (exception instanceof CustomException) {
    if (exception.message?.msg && exception.message?.rtnCode) {
      return {
        msg: exception.message.msg,
        rtnCode: exception.message.rtnCode,
      };
    } else {
      return {
        msg: exception.error.MESSAGE.replace('%s', appName),
        rtnCode: exception.error.CODE,
      };
    }
  } else {
    const internalSeverError = ERROR.INTERNAL_SERVER_ERROR_EXCEPTION;
    return {
      msg: internalSeverError.getMessage().replace('%s', appName),
      rtnCode: internalSeverError.getCode(),
    };
  }
}

export function toErrorDbLogString(msg: string, rtnCode: string): string {
  return `Message = ${msg} / Return Code = ${rtnCode}`;
}
