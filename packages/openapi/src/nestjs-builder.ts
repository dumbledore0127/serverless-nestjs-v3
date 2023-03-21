import {
  ClientBuilder,
  ClientGeneratorsBuilder,
  generateVerbImports,
  pascal,
  ClientDependenciesBuilder,
} from "@orval/core";
import Mustache from "mustache";

const template = `export const {{operationName}}Path = "{{path}}";
export const {{operationName}}Route = () => {{method}}({{operationName}}Path);
{{#hasParam}}
export type {{operationName}}Param = {
  {{#param}}
  {{.}};
  {{/param}}
};
{{/hasParam}}
{{#query}}
export type {{operationName}}Query = {{query}};
{{/query}}
{{#body}}
export type {{operationName}}Body = {{body}};
{{/body}}
export type {{operationName}}Response = {{response}};
export class {{operationName}}Exception extends ApiException<{{exception}}> {}

`;

const buildClient: ClientBuilder = (verbOptions, options) => ({
  implementation: Mustache.render(
    template,
    {
      operationName: pascal(verbOptions.operationName),
      method: pascal(verbOptions.verb),
      path: options.pathRoute.replaceAll(/{(.*?)}/g, ":$1"),
      hasParam: verbOptions.params.length > 0,
      param: verbOptions.params.map((it) => it.definition),
      query: verbOptions.queryParams?.schema.name,
      body: verbOptions.body.definition,
      response: verbOptions.response.definition.success,
      exception:
        verbOptions.response.definition.errors === "unknown"
          ? "never"
          : `(${verbOptions.response.definition.errors})["code"]`,
    },
    undefined,
    {
      escape: (x) => x,
    }
  ),
  imports: generateVerbImports(verbOptions),
});

const buildDependencies: ClientDependenciesBuilder = () => [
  {
    exports: [
      { name: "Get", values: true },
      { name: "Post", values: true },
      { name: "Put", values: true },
      { name: "Delete", values: true },
      { name: "Patch", values: true },
      { name: "Options", values: true },
      { name: "Head", values: true },
    ],
    dependency: "@nestjs/common",
  },
  {
    exports: [{ name: "ApiException", values: true }],
    dependency: "../core/api-exception",
  },
];

export const nestJsBuilder = (): ClientGeneratorsBuilder => ({
  client: buildClient,
  dependencies: buildDependencies,
});
