import axios from "axios";
import { createApiLoggingInterceptor } from "./api-logging-interceptor";

export type ApiClientOptions = {
  baseURL: string;
};

export const createApiClient = (options: ApiClientOptions) => {
  const instance = axios.create({
    baseURL: options.baseURL,
    timeout: 30 * 1000,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  instance.interceptors.response.use(...createApiLoggingInterceptor());

  return instance;
};
