import { AxiosError, AxiosRequestConfig, isAxiosError } from "axios";
import { createApiClient } from "./api-client";
import { ApiError } from "./api-error";
import { isApiResponse } from "./api-response";

const instance = createApiClient({
  // TODO:
  baseURL: "http://localhost:8080",
});

export const customMutator = async <T>(
  config: AxiosRequestConfig
): Promise<T> => {
  try {
    const { data } = await instance.request<T>(config);
    return data;
  } catch (err) {
    if (!isAxiosError(err)) {
      throw new ApiError(
        "unknown-error",
        "Expected an AxiosError but dit not.",
        err
      );
    }

    if (err.response === undefined) {
      // NOTE:
      switch (err.code) {
        case AxiosError.ECONNABORTED:
          throw new ApiError("network-error", err.message, err);
        default:
          throw new ApiError("timeout-error", err.message, err);
      }
    }

    const { data } = err.response;
    if (!isApiResponse(data)) {
      throw new ApiError(
        "unknown-error",
        "The server response did not have code or message property.",
        err
      );
    }

    throw new ApiError(data.code ?? "unknown-error", data.message, err);
  }
};

export type ErrorType<T> = T extends { code?: string }
  ? ApiError<Exclude<T["code"], undefined>>
  : ApiError<never>;
