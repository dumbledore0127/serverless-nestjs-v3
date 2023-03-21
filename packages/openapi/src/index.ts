import orval from "orval";
import { preprocess } from "./preprocess";
import { resolve, join } from "path";
import { nestJsBuilder } from "./nestjs-builder";

const packageDir = resolve(__dirname, "../..");

void (async () => {
  await preprocess(join(packageDir, "openapi/openapi.yaml"));

  await orval({
    input: {
      target: join(packageDir, "openapi/openapi.yaml"),
    },
    output: {
      target: join(packageDir, "web/src/api/client"),
      client: "react-query",
      schemas: join(packageDir, "web/src/api/model"),
      mode: "tags",
      clean: true,
      prettier: true,
      override: {
        mutator: {
          path: join(packageDir, "web/src/api/custom-mutator.ts"),
          name: "customMutator",
        },
      },
    },
  });

  await orval({
    input: {
      target: "./openapi.yaml",
    },
    output: {
      target: join(packageDir, "backend/src/generated"),
      client: nestJsBuilder,
      schemas: join(packageDir, "backend/src/generated/model"),
      mode: "tags",
      clean: true,
      prettier: true,
    },
  });
})();
