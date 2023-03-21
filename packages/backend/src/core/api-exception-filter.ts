import { BaseExceptionFilter } from "@nestjs/core";
import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { ApiException } from "./api-exception";
import { MESSAGES } from "@nestjs/core/constants";
import { HttpError } from "express-openapi-validator/dist/framework/types";

@Catch()
export class ApiExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(ApiExceptionFilter.name);

  toHttpException(exception: unknown): HttpException {
    if (exception instanceof HttpException) {
      return exception;
    }

    if (exception instanceof HttpError) {
      return new ApiException(
        {
          message: exception.message,
        },
        exception.status,
        exception
      );
    }

    const res = this.isHttpError(exception)
      ? {
          status: exception.statusCode,
          message: exception.message,
        }
      : {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: MESSAGES.UNKNOWN_EXCEPTION_MESSAGE,
        };

    return new ApiException({ message: res.message }, res.status, exception);
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    const httpException = this.toHttpException(exception);

    httpException.getStatus() < HttpStatus.INTERNAL_SERVER_ERROR
      ? this.logger.log(exception)
      : this.logger.error(exception);

    super.catch(httpException, host);
  }
}
