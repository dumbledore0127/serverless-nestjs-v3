import { AxiosResponse, AxiosInterceptorManager } from "axios";

export const createApiLoggingInterceptor = (): Parameters<
  AxiosInterceptorManager<AxiosResponse>["use"]
> => {
  const responseHandler = (res: AxiosResponse): AxiosResponse => {
    console.info(res);
    return res;
  };

  const errorHandler = (err: unknown) => {
    console.error(err);
    throw err;
  };

  return [responseHandler, errorHandler];
};
