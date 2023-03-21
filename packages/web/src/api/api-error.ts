export type ApiCommonErrorCode =
  | "unknown-error"
  | "network-error"
  | "timeout-error"
  | "server-error"
  | "validation-error"
  | "authentication-error";

export class ApiError<ApiExtraErrorCode extends string> extends Error {
  constructor(
    readonly code: ApiCommonErrorCode | ApiExtraErrorCode,
    message: string,
    cause: unknown
  ) {
    super(message, { cause });

    Object.defineProperty(this, "name", {
      configurable: true,
      enumerable: false,
      value: this.constructor.name,
      writable: true,
    });

    if (cause instanceof Error && cause.stack !== undefined) {
      this.stack = this.stack + "\nCaused By: " + cause.stack;
    }
  }
}
