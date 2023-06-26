import { ValidationArguments } from 'class-validator';

export class ERROR {
  // 10000 (HTTP)
  public static GENERAL_ERROR = new ERROR('%s.error.general', '10000');
  public static BAD_REQUEST_EXCEPTION = new ERROR(
    '%s.error.badRequest',
    '10001',
  );
  public static HTTP_EXCEPTION = new ERROR('%s.error.httpException', '10002');
  public static UNAUTHORIZED_EXCEPTION = new ERROR(
    '%s.error.unauthorized',
    '10003',
  );
  public static METHOD_NOT_ALLOWED_EXCEPTION = new ERROR(
    '%s.error.methodNotAllowed',
    '10004',
  );
  public static NOT_FOUND_EXCEPTION = new ERROR('%s.error.notFound', '10005');
  public static FORBIDDEN_EXCEPTION = new ERROR('%s.error.forbidden', '10006');
  public static NOT_ACCEPTABLE_EXCEPTION = new ERROR(
    '%s.error.notAcceptable',
    '10007',
  );
  public static REQUEST_TIMEOUT_EXCEPTION = new ERROR(
    '%s.error.requestTimeout',
    '10008',
  );
  public static CONFLICT_EXCEPTION = new ERROR('%s.error.conflict', '10009');
  public static GONE_EXCEPTION = new ERROR('%s.error.gone', '10010');
  public static PAYLOAD_TOO_LARGE_EXCEPTION = new ERROR(
    '%s.error.payloadTooLarge',
    '10011',
  );
  public static UNSUPPORTED_MEDIA_TYPE_EXCEPTION = new ERROR(
    '%s.error.UnsupportedMediaType',
    '10012',
  );
  public static UNPROCESSABLE_ENTITY_EXCEPTION = new ERROR(
    '%s.error.UnprocessableEntity',
    '10013',
  );
  public static INTERNAL_SERVER_ERROR_EXCEPTION = new ERROR(
    '%s.error.InternalServerError',
    '10014',
  );
  public static NOT_IMPLEMENTED_EXCEPTION = new ERROR(
    '%s.error.NotImplemented',
    '10015',
  );
  public static HTTP_VERSION_NOT_SUPPORTED_EXCEPTION = new ERROR(
    '%s.error.HttpVersionNotSupport',
    '10016',
  );
  public static BAD_GATEWAY_EXCEPTION = new ERROR(
    '%s.error.badGateway',
    '10017',
  );
  public static SERVICE_UNAVAILABLE_EXCEPTION = new ERROR(
    '%s.error.serviceUnavailable',
    '10018',
  );
  public static GATEWAY_TIMEOUT_EXCEPTION = new ERROR(
    '%s.error.gatewayTimeout',
    '10019',
  );
  public static PRECONDITION_FAILED_EXCEPTION = new ERROR(
    '%s.error.preconditionFailed',
    '10020',
  );
  public static MISDIRECTED_EXCEPTION = new ERROR(
    '%s.error.misdirected',
    '10021',
  );
  public static UNEXPECTED_EXCEPTION = new ERROR(
    '%s.error.unexpected',
    '10022',
  );

  public MESSAGE: string;
  public CODE: string;

  private constructor(MESSAGE: string, CODE: string) {
    this.MESSAGE = MESSAGE;
    this.CODE = CODE;
  }

  public getValidationMessage(args?: ValidationArguments): string {
    return JSON.stringify({ message: this.MESSAGE, code: this.CODE, args });
  }

  public getMessage(): string {
    return this.MESSAGE;
  }

  public getCode(): string {
    return this.CODE;
  }
}
