import rule from "../../src/rules/ts-ban-snippets";
import { creteRuleTester, getCode } from "../testUtils";

creteRuleTester(__dirname).run("ts-ban-snippets - multiple snippets", rule, {
  valid: [
    {
      code: getCode("fixtures/valid/test.ts", __dirname),
      filename: "valid/test.ts",
      options: [
        {
          banned: [
            {
              snippets: ["return void reject", "return void resolve"],
              message:
                "Please do not return void - instead place the return statement on the following line.",
            },
            {
              snippets: ["it.only", "describe.only"],
              message: "Do not enable only some tests.",
            },
            {
              snippets: ["it.skip", "describe.skip"],
              message: "Do not skip tests.",
            },
          ],
        },
      ],
    },
  ],
  invalid: [
    {
      code: getCode("fixtures/invalid/test-debugger.ts", __dirname),
      filename: "invalid/test-debugger.ts",
      options: [
        {
          banned: [
            {
              snippets: ["browser.debug", "debugger"],
              message: "Please remove breakpoint statements.",
            },
            {
              snippets: ["it.only", "describe.only"],
              message: "Do not enable only some tests.",
            },
            {
              snippets: ["it.skip", "describe.skip"],
              message: "Do not skip tests.",
            },
          ],
        },
      ],
      errors: [
        {
          messageId: "BannedSnippetMessage",
          data: {
            name: "debugger",
            message: "Please remove breakpoint statements.",
            ruleName: "ts-ban-snippets",
          },
        },
      ],
    },
    {
      code: getCode("fixtures/invalid/test-disabled-test.ts", __dirname),
      filename: "invalid/test-disabled-test.ts",
      options: [
        {
          banned: [
            {
              snippets: ["return void reject", "return void resolve"],
              message:
                "Please do not return void - instead place the return statement on the following line.",
            },
            {
              snippets: ["it.only", "describe.only"],
              message: "Do not enable only some tests.",
            },
            {
              snippets: ["it.skip", "describe.skip"],
              message: "Do not skip tests.",
            },
          ],
        },
      ],
      errors: [
        {
          messageId: "BannedSnippetMessage",
          data: {
            name: "it.only",
            message: "Do not enable only some tests.",
            ruleName: "ts-ban-snippets",
          },
        },
      ],
    },
    {
      code: getCode("fixtures/invalid/test-return-void.ts", __dirname),
      filename: "invalid/test-return-void.ts",
      options: [
        {
          banned: [
            {
              snippets: ["return void reject", "return void resolve"],
              message:
                "Please do not return void - instead place the return statement on the following line.",
            },
            {
              snippets: ["it.only", "describe.only"],
              message: "Do not enable only some tests.",
            },
            {
              snippets: ["it.skip", "describe.skip"],
              message: "Do not skip tests.",
            },
          ],
        },
      ],
      errors: [
        {
          messageId: "BannedSnippetMessage",
          data: {
            name: "return void resolve",
            message:
              "Please do not return void - instead place the return statement on the following line.",
            ruleName: "ts-ban-snippets",
          },
        },
      ],
    },
  ],
});
