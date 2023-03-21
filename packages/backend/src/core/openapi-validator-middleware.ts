import { resolve } from "path";
import * as OpenApiValidator from "express-openapi-validator";
import { OpenApiRequestHandler } from "express-openapi-validator/dist/framework/types";

export const openApiValidatorMiddleware = (): OpenApiRequestHandler[] => {
  // TODO: coerce について検討
  return OpenApiValidator.middleware({
    // TODO: 壊れやすい指定なので要改善
    apiSpec: resolve(__dirname, "../../../openapi/openapi.yaml"),
    validateRequests: {
      removeAdditional: true,
    },
    validateResponses: {
      removeAdditional: "failing",
    },
    validateSecurity: false,
    validateFormats: true,
    ajvFormats: {
      mode: "full",
    },
  });
};
