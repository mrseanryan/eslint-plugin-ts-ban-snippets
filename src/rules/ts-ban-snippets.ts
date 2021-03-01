import { ESLintUtils } from "@typescript-eslint/experimental-utils";

export type Options = [];
export type MessageIds = "BannedSnippetMessage";

const createRule = ESLintUtils.RuleCreator((name) => {
  return `https://github.com/mrseanryan/eslint-plugin-ts-ban-snippets/blob/master/docs/${name}.md`;
});

const BannedSnippetMessage = "{{name}} is a banned code snippet";

export default createRule<Options, MessageIds>({
  name: "js-function-in-worklet",
  meta: {
    type: "problem",
    docs: {
      description:
        "non-worklet functions should be invoked via runOnJS. Use runOnJS() or workletlize instead.",
      category: "Possible Errors",
      recommended: "error",
    },
    fixable: "code",
    schema: [],
    messages: {
      BannedSnippetMessage,
    },
  },
  defaultOptions: [],
  create: (context) => {
    const parserServices = ESLintUtils.getParserServices(context);
    // const config = parserServices.program.getCompilerOptions()
    //   .configFilePath as string;

    // TODO xxx read from config
    const bannedSnippet = "xxx";

    return {
      Program: (node) => {
        const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node);

        if (tsNode.getText().indexOf(bannedSnippet) >= 0)
        {
          context.report({
            messageId: "BannedSnippetMessage",
            ...node,
            data: {
              name: bannedSnippet,
            },
          });
        }
      },
    };
  },
});
