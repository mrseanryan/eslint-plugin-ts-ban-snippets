import fs from "fs";
import path from "path";

import { ESLintUtils } from "@typescript-eslint/experimental-utils";

import rule from "../../src/rules/ts-ban-snippets";

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

ruleTester.run("ts-ban-snippets - simple", rule, {
  valid: [
    {
      code: code("fixtures/valid/test.ts"),
      filename: "valid/test.ts",
      options: [
        {
          banned: [
            {
              snippets: ["return void reject", "return void resolve"],
              message:
                "Please do not return void - instead place the return statement on the following line.",
            },
          ],
        },
      ],
    },
  ],
  invalid: [
    {
      code: code("fixtures/invalid/test1.ts"),
      filename: "invalid/test1.ts",
      options: [
        {
          banned: [
            {
              snippets: ["return void reject", "return void resolve"],
              message:
                "Please do not return void - instead place the return statement on the following line.",
            },
          ],
        },
      ],
      errors: [
        {
          messageId: "BannedSnippetMessage",
          data: {
            name: 'return void resolve("error!");',
            message:
              "Please do not return void - instead place the return statement on the following line.",
            ruleName: "ts-ban-snippets",
          },
        },
      ],
    },
  ],
});
