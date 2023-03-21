module.exports = {
  web: {
    input: {
      target: "./openapi.yaml",
    },
    output: {
      target: "../web/src/api/client",
      client: "react-query",
      schemas: "../web/src/api/model",
      mode: "tags",
      clean: true,
      prettier: true,
      override: {
        mutator: {
          path: "../web/src/api/custom-mutator.ts",
          name: "customMutator",
        },
      },
    },
  },
  backend: {
    input: {
      target: "./openapi.yaml",
    },
    output: {
      target: "../backend/src/generated/client",
      client: "axios-functions",
      schemas: "../backend/src/generated",
      mode: "tags",
      clean: true,
      prettier: true,
    },
  },
};
