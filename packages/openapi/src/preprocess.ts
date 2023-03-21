import fs from "fs";
import yaml from "yaml";
import { resolve } from "path";

const target = resolve(__dirname, "../openapi.yaml");
const input = yaml.parse(fs.readFileSync(target, { encoding: "utf-8" }));
const output = yaml.stringify(input, (key, value) =>
  key === "x-stoplight" ? undefined : value
);
fs.writeFileSync(target, output);
