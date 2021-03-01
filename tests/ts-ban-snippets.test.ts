import { ESLintUtils } from "@typescript-eslint/experimental-utils";
import fs from "fs";
import path from "path";
import rule from "../src/rules/ts-ban-snippets";

const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.eslint.json",
    tsconfigRootDir: path.join(__dirname, "fixtures"),
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
});

const code = (name: string) =>
  fs.readFileSync(path.join(__dirname, name), "utf8");

ruleTester.run("ts-ban-snippets", rule, {
  valid: [
    {
      code: code("fixtures/valid/test.ts"),
      filename: "valid/test.ts",
    },
  ],
  invalid: [
    {
      code: code("fixtures/invalid/test1.ts"),
      filename: "invalid/test1.ts",
      errors: [
        {
          messageId: "BannedSnippetMessage",
          data: {
            name: "xxx",
          },
        },
      ],
    },
  ],
});
