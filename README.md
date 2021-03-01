Ban snippets of TypeScript from your project, using eslint.

examples: "return void reject", "it.only", "debugger".

This is an eslint port of [https://github.com/mrseanryan/tslint-ban-snippets](tslint-ban-snippets)

## Installation

This plugin requires your project to use TypeScript (>=4.1.3).

```sh
yarn add eslint-plugin-ts-ban-snippets --dev
```

## Example Configuration

The plugin relies on TypeScript compiler services to resolve types.
You need to set your `tsconfig.json` file in your eslint configuration via `parserOptions`.

```json
{
  "plugins": ["ts-exports"],
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "rules": {
    "ts-exports/ts-ban-snippets: 2
  }
}
```

## Rules

- [ts-ban-snippets](./docs/ts-ban-snippets.md)
