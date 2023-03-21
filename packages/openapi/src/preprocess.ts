import fs from "fs";
import yaml from "yaml";

const readFile = (path: string): Promise<string> =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.toString("utf-8"));
      }
    });
  });

const writeFile = (path: string, data: string): Promise<void> =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

export const preprocess = async (target: string): Promise<void> => {
  const input = yaml.parse(await readFile(target));
  const output = yaml.stringify(input, (key, value) =>
    key === "x-stoplight" ? undefined : value
  );
  await writeFile(target, output);
};
