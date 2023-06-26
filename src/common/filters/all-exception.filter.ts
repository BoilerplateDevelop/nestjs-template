import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import * as exceptions from '@nestjs/common/exceptions';
import * as errors from 'typeorm/error';
import { ValidationError } from 'class-validator';
import { CustomException } from '../exception/custom.exception';
import { generateResponseERROR } from '../generic.response';
import { ERROR } from '../exception/constants/error.message.constant';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private SERVICE_NAME: string;

  constructor() {
    this.SERVICE_NAME = 'server';
  }

  catch(exception: CustomException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    let responseMesage;
    try {
      responseMesage = exception.getResponse()['message'];
    } catch (e) {}

    // if (
    //   typeof responseMesage === 'object' &&
    //   (responseMesage[0] as ValidationError)?.target != null &&
    //   (responseMesage[0] as ValidationError)?.property != null
    // ) {
    //   // this.logger.info(responseMesage)
    //   return response
    //     .status(HttpStatus.BAD_REQUEST)
    //     .send(
    //       generateResponseERROR(
    //         ERROR.USER_VALIDATION_ERROR,
    //         this.SERVICE_NAME,
    //         responseMesage,
    //       ),
    //     );
    // }

    switch (exception.name) {
      case exceptions.BadRequestException.name: {
        response
          .status(HttpStatus.BAD_REQUEST)
          .send(
            generateResponseERROR(
              ERROR.BAD_REQUEST_EXCEPTION,
              this.SERVICE_NAME,
              responseMesage,
            ),
          );
        break;
      }
      case exceptions.HttpException.name: {
        response
          .status(HttpStatus.BAD_REQUEST)
          .send(
            generateResponseERROR(
              ERROR.HTTP_EXCEPTION,
              this.SERVICE_NAME,
              responseMesage,
            ),
          );
        break;
      }
      case exceptions.UnauthorizedException.name: {
        response
          .status(HttpStatus.UNAUTHORIZED)
          .send(
            generateResponseERROR(
              ERROR.UNAUTHORIZED_EXCEPTION,
              this.SERVICE_NAME,
              responseMesage,
            ),
          );
        break;
      }
      case exceptions.MethodNotAllowedException.name: {
        response
          .status(HttpStatus.METHOD_NOT_ALLOWED)
          .send(
            generateResponseERROR(
              ERROR.METHOD_NOT_ALLOWED_EXCEPTION,
              this.SERVICE_NAME,
              responseMesage,
            ),
          );
        break;
      }
      case exceptions.NotFoundException.name: {
        response
          .status(HttpStatus.NOT_FOUND)
          .send(
            generateResponseERROR(
              ERROR.NOT_FOUND_EXCEPTION,
              this.SERVICE_NAME,
              responseMesage,
            ),
          );
        break;
      }
      case exceptions.ForbiddenException.name: {
        // auth guard fail
        response
          .status(HttpStatus.UNAUTHORIZED)
          .send(
            generateResponseERROR(
              ERROR.UNAUTHORIZED_EXCEPTION,
              this.SERVICE_NAME,
              responseMesage,
            ),
          );
        break;
      }
      case exceptions.NotAcceptableException.name: {
        response
          .status(HttpStatus.NOT_ACCEPTABLE)
          .send(
            generateResponseERROR(
              ERROR.NOT_ACCEPTABLE_EXCEPTION,
              this.SERVICE_NAME,
              responseMesage,
            ),
          );
        break;
      }
      case exceptions.RequestTimeoutException.name: {
        response
          .status(HttpStatus.REQUEST_TIMEOUT)
          .send(
            generateResponseERROR(
              ERROR.REQUEST_TIMEOUT_EXCEPTION,
              this.SERVICE_NAME,
              responseMesage,
            ),
          );
        break;
      }
      case exceptions.ConflictException.name: {
        response
          .status(HttpStatus.CONFLICT)
          .send(
            generateResponseERROR(
              ERROR.CONFLICT_EXCEPTION,
              this.SERVICE_NAME,
              responseMesage,
            ),
          );
        break;
      }
      case exceptions.GoneException.name: {
        response
          .status(HttpStatus.GONE)
          .send(
            generateResponseERROR(
              ERROR.GONE_EXCEPTION,
              this.SERVICE_NAME,
              responseMesage,
            ),
          );
        break;
      }
      case exceptions.PayloadTooLargeException.name: {
        response
          .status(HttpStatus.PAYLOAD_TOO_LARGE)
          .send(
            generateResponseERROR(
              ERROR.PAYLOAD_TOO_LARGE_EXCEPTION,
              this.SERVICE_NAME,
              responseMesage,
            ),
          );
        break;
      }
      case exceptions.UnsupportedMediaTypeException.name: {
        response
          .status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
          .send(
            generateResponseERROR(
              ERROR.UNSUPPORTED_MEDIA_TYPE_EXCEPTION,
              this.SERVICE_NAME,
              responseMesage,
            ),
          );
        break;
      }
      case exceptions.UnprocessableEntityException.name: {
        response
          .status(HttpStatus.UNPROCESSABLE_ENTITY)
          .send(
            generateResponseERROR(
              ERROR.UNPROCESSABLE_ENTITY_EXCEPTION,
              this.SERVICE_NAME,
              responseMesage,
            ),
          );
        break;
      }
      case exceptions.InternalServerErrorException.name: {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send(
            generateResponseERROR(
              ERROR.INTERNAL_SERVER_ERROR_EXCEPTION,
              this.SERVICE_NAME,
              responseMesage,
            ),
          );
        break;
      }
      case exceptions.NotImplementedException.name: {
        response
          .status(HttpStatus.NOT_IMPLEMENTED)
          .send(
            generateResponseERROR(
              ERROR.NOT_IMPLEMENTED_EXCEPTION,
              this.SERVICE_NAME,
              responseMesage,
            ),
          );
        break;
      }
      case exceptions.HttpVersionNotSupportedException.name: {
        response
          .status(HttpStatus.HTTP_VERSION_NOT_SUPPORTED)
          .send(
            generateResponseERROR(
              ERROR.HTTP_VERSION_NOT_SUPPORTED_EXCEPTION,
              this.SERVICE_NAME,
              responseMesage,
            ),
          );
        break;
      }
      case exceptions.BadGatewayException.name: {
        response
          .status(HttpStatus.BAD_GATEWAY)
          .send(
            generateResponseERROR(
              ERROR.BAD_GATEWAY_EXCEPTION,
              this.SERVICE_NAME,
              responseMesage,
            ),
          );
        break;
      }
      case exceptions.ServiceUnavailableException.name: {
        response
          .status(HttpStatus.SERVICE_UNAVAILABLE)
          .send(
            generateResponseERROR(
              ERROR.SERVICE_UNAVAILABLE_EXCEPTION,
              this.SERVICE_NAME,
              responseMesage,
            ),
          );
        break;
      }
      case exceptions.GatewayTimeoutException.name: {
        response
          .status(HttpStatus.GATEWAY_TIMEOUT)
          .send(
            generateResponseERROR(
              ERROR.GATEWAY_TIMEOUT_EXCEPTION,
              this.SERVICE_NAME,
              responseMesage,
            ),
          );
        break;
      }
      // case exceptions.ImATeapotException.name: {
      //   response
      //     .status(HttpStatus.I_AM_A_TEAPOT)
      //     .send(
      //       generateResponseERROR(
      //         ERROR.IM_A_TEAPOT_EXCEPTION,
      //         this.SERVICE_NAME,
      //         responseMesage,
      //       ),
      //     );
      //   break;
      // }
      case exceptions.PreconditionFailedException.name: {
        response
          .status(HttpStatus.PRECONDITION_REQUIRED)
          .send(
            generateResponseERROR(
              ERROR.PRECONDITION_FAILED_EXCEPTION,
              this.SERVICE_NAME,
              responseMesage,
            ),
          );
        break;
      }
      case exceptions.MisdirectedException.name: {
        response
          .status(HttpStatus.MISDIRECTED)
          .send(
            generateResponseERROR(
              ERROR.MISDIRECTED_EXCEPTION,
              this.SERVICE_NAME,
              responseMesage,
            ),
          );
        break;
      }
      // case errors.EntityNotFoundError.name: {
      //   response
      //     .status(HttpStatus.NOT_FOUND)
      //     .send(
      //       generateResponseERROR(
      //         ERROR.ENTITY_NOT_FOUND_ERROR,
      //         this.SERVICE_NAME,
      //         responseMesage,
      //       ),
      //     );
      //   break;
      // }
      case CustomException.name: {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send(
            generateResponseERROR(
              exception.error,
              this.SERVICE_NAME,
              exception.message,
            ),
          );
        break;
      }
      default: {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send(
            generateResponseERROR(
              ERROR.UNEXPECTED_EXCEPTION,
              this.SERVICE_NAME,
              responseMesage,
            ),
          );
        break;
      }
    }
  }
}
