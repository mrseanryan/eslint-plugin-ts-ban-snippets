import rule from "../../src/rules/ts-ban-snippets";
import { creteRuleTester, getCode } from "../testUtils";

creteRuleTester(__dirname).run("ts-ban-snippets - excludePaths", rule, {
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
              excludePaths: ["excluded"],
            },
          ],
        },
      ],
    },
    {
      code: getCode("fixtures/valid/test1-excluded.ts", __dirname),
      filename: "valid/test1-excluded.ts",
      options: [
        {
          banned: [
            {
              snippets: ["return void reject", "return void resolve"],
              message:
                "Please do not return void - instead place the return statement on the following line.",
              excludePaths: ["excluded"],
            },
          ],
        },
      ],
      // no errors - since is excluded
    },
  ],
  invalid: [
    {
      code: getCode("fixtures/invalid/test1.ts", __dirname),
      filename: "invalid/test1.ts",
      options: [
        {
          banned: [
            {
              snippets: ["return void reject", "return void resolve"],
              message:
                "Please do not return void - instead place the return statement on the following line.",
              excludePaths: ["excluded"],
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
