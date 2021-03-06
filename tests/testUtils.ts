import fs from "fs";
import path from "path";

import { ESLintUtils } from "@typescript-eslint/experimental-utils";

export const creteRuleTester = (dirName: string): ESLintUtils.RuleTester =>
  new ESLintUtils.RuleTester({
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: "./tsconfig.eslint.json",
      tsconfigRootDir: path.join(dirName, "fixtures"),
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
  });

export const getCode = (name: string, dirName: string): string =>
  fs.readFileSync(path.join(dirName, name), "utf8");
