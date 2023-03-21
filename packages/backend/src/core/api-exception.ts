import { HttpException, HttpStatus } from "@nestjs/common";
import { BaseException } from "./base-exception";

export type ApiResponse<T = string> = {
  code?: T;
  message: string;
};

export class ApiException<T = string> extends HttpException {
  constructor(response: ApiResponse<T>, status: HttpStatus, cause: unknown) {
    super(response, status, {
      cause:
        cause instanceof Error
          ? cause
          : new BaseException("cause of ApiException", cause),
    });
  }
}
