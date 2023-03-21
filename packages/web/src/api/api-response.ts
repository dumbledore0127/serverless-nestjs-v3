export type ApiResponse = {
  code?: string;
  message: string;
};

export const isApiResponse = (data: unknown): data is ApiResponse =>
  typeof data === "object" &&
  data !== null &&
  (("code" in data && typeof data.code === "string") || !("code" in data)) &&
  "message" in data &&
  typeof data.message === "string";
