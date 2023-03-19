import { HttpException, HttpStatus } from "@nestjs/common";
import { BaseException } from "./base-exception";

export type ApiResponse = {
  code?: string;
  message: string;
};

export class ApiException extends HttpException {
  constructor(response: ApiResponse, status: HttpStatus, cause: unknown) {
    super(response, status, {
      cause:
        cause instanceof Error
          ? cause
          : new BaseException("cause of ApiException", cause),
    });
  }
}
