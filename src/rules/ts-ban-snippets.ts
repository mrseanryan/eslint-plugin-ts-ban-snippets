import { LineAndCharacter, Node } from "typescript";

import { ESLintUtils } from "@typescript-eslint/experimental-utils";
import {
    ReportDescriptor, RuleContext
} from "@typescript-eslint/experimental-utils/dist/ts-eslint";

type Banned = {
  snippets?: string[];
  regexSnippets?: string[];
  message: string;
  includePaths?: string[];
  excludePaths?: string[];
};

export type Options = [
  {
    banned: Banned[];
  }
];

export type MessageIds = "BannedSnippetMessage";

// ref = https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin-tslint/src/rules/config.ts

const createRule = ESLintUtils.RuleCreator((name) => {
  return `https://github.com/mrseanryan/eslint-plugin-ts-ban-snippets/blob/main/docs/${name}.md`;
});

const BannedSnippetMessage =
  "'{{name}}' is a banned code snippet - {{message}} [{{ruleName}}]";

function isFileInPaths(filePath: string, paths: string[]): boolean {
  return paths.some((path) => filePath.indexOf(path) >= 0);
}

const isRegexMatch = (regexRaw: string, text: string): boolean => {
  const regex = new RegExp(regexRaw);
  return regex.test(text);
};

const filterSnippets = (
  bannedSnippetsRaw: string[],
  isRegex: boolean,
  text: string
): string[] => {
  const filterFun = (s: string): boolean => {
    if (isRegex) return isRegexMatch(s, text);
    return text.startsWith(s);
  };

  return bannedSnippetsRaw.filter(filterFun);
};

const analyzeNodeFor = (
  node: Node,
  banned: Banned,
  context: Readonly<RuleContext<"BannedSnippetMessage", Options>>,
  alreadyReported: string[]
) => {
  const fileName = node.getSourceFile().fileName;
  if (!!banned.includePaths && !isFileInPaths(fileName, banned.includePaths))
    return;

  if (!!banned.excludePaths && isFileInPaths(fileName, banned.excludePaths))
    return;

  const text = node.getText();

  node.getStart();
  node.getEnd();
  node.getSourceFile().getLineAndCharacterOfPosition(node.pos);

  if (!!banned.snippets && !!banned.regexSnippets) {
    throw new Error(
      "Invalid config: 'snippets' and 'regexSnippets' are mutually exclusive."
    );
  }

  const bannedSnippetsRaw = banned.snippets || banned.regexSnippets || [];
  const isRegex = !!banned.regexSnippets;

  const bannedSnippets = filterSnippets(bannedSnippetsRaw, isRegex, text);

  if (bannedSnippets.length > 0) {
    const pos = node.getSourceFile().getLineAndCharacterOfPosition(node.pos);
    reportOnlyOnce(
      context,
      pos,
      bannedSnippets[0] as string,
      banned,
      alreadyReported
    );
  }

  node.forEachChild((c) => analyzeNodeFor(c, banned, context, alreadyReported));
};

export default createRule<Options, MessageIds>({
  name: "ts-ban-snippets",
  meta: {
    type: "problem",
    docs: {
      description: "This TypeScript snippet is banned and should not be used.",
      category: "Possible Errors",
      recommended: "error",
    },
    fixable: "code",
    messages: {
      BannedSnippetMessage,
    },
    schema: [
      {
        type: "object",
        properties: {
          banned: {
            type: "array",
            items: {
              type: "object",
              properties: {
                snippets: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                // regexSnippets and snippets are mutually exclusive
                regexSnippets: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                message: {
                  type: "string",
                },
                includePaths: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                excludePaths: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
              },
              additionalProperties: false,
            },
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [{ banned: [] }],
  create: (context) => {
    if (!context.options[0]) {
      return {
        Program: () => {
          // do nothing
        },
      };
    }

    const parserServices = ESLintUtils.getParserServices(context);

    /**
     * The TSLint rules configuration passed in by the user
     */
    const banned = context.options[0].banned;

    return {
      Program: (node) => {
        const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node);

        // prevent duplicate errors:
        const alreadyReported: string[] = [];

        tsNode.forEachChild((child) => {
          banned.forEach((b) =>
            analyzeNodeFor(child, b, context, alreadyReported)
          );
        });
      },
    };
  },
});

function clone(obj: unknown): unknown {
  return JSON.parse(JSON.stringify(obj, null, 0));
}

type LineAndColumn = {
  line: number;
  column: number;
};

function isAlreadyReported(
  id: LineAndColumn,
  alreadyReported: string[]
): boolean {
  const problemClone = clone(id);

  const json = JSON.stringify(problemClone, null, 0);
  if (alreadyReported.includes(json)) return true;

  alreadyReported.push(json);

  return false;
}

function reportOnlyOnce(
  context: Readonly<RuleContext<"BannedSnippetMessage", Options>>,
  pos: LineAndCharacter,
  bannedSnippet: string,
  banned: Banned,
  alreadyReported: string[]
) {
  const loc = {
    line: pos.line,
    column: pos.character,
  };

  const problem: ReportDescriptor<"BannedSnippetMessage"> = {
    loc: loc,
    messageId: "BannedSnippetMessage",
    data: {
      name: bannedSnippet,
      message: banned.message,
      ruleName: "ts-ban-snippets",
    },
  };

  if (!isAlreadyReported(loc, alreadyReported)) context.report(problem);
}
