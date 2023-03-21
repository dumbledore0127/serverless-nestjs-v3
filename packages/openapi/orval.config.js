module.exports = {
  sample: {
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
};
