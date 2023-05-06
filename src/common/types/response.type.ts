export interface ResponseSchema<T> {
  status: ResponseStatus;
  data: T;
  message?: string | string[];
}

export enum ResponseStatus {
  SUCCESS = 'success',
  FAIL = 'fail',
  ERROR = 'error',
}
