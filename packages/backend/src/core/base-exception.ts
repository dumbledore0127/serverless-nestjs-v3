export class BaseException extends Error {
  constructor(message: string, cause: unknown) {
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
