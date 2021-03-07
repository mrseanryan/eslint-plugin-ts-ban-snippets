import rule from "../../src/rules/ts-ban-snippets";
import { creteRuleTester, getCode } from "../testUtils";

creteRuleTester(__dirname).run("ts-ban-snippets - includePaths", rule, {
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
              includePaths: ["included"],
            },
          ],
        },
      ],
    },
    {
      code: getCode("fixtures/valid/test1-not-cluded.ts", __dirname),
      filename: "valid/test1-not-cluded.ts",
      options: [
        {
          banned: [
            {
              snippets: ["return void reject", "return void resolve"],
              message:
                "Please do not return void - instead place the return statement on the following line.",
              includePaths: ["included"],
            },
          ],
        },
      ],
      // no errors - since is NOT included
    },
  ],
  invalid: [
    {
      code: getCode("fixtures/invalid/test1-included.ts", __dirname),
      filename: "invalid/test1-included.ts",
      options: [
        {
          banned: [
            {
              snippets: ["return void reject", "return void resolve"],
              message:
                "Please do not return void - instead place the return statement on the following line.",
              includePaths: ["included"],
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
