# STATUS = WIP (Work In Progress!)

![CI CD Build](https://github.com/mrseanryan/eslint-plugin-ts-ban-snippets/actions/workflows/node.js.yml/badge.svg)

[![Size](https://packagephobia.now.sh/badge?p=eslint-plugin-ts-ban-snippets)](https://packagephobia.now.sh/result?p=eslint-plugin-ts-ban-snippets)

[![Dependencies](https://david-dm.org/mrseanryan/eslint-plugin-ts-ban-snippets.svg)](https://david-dm.org/mrseanryan/eslint-plugin-ts-ban-snippets)

[![npm Package](https://img.shields.io/npm/v/eslint-plugin-ts-ban-snippets.svg?style=flat-square)](https://www.npmjs.org/package/eslint-plugin-ts-ban-snippets)
[![NPM Downloads](https://img.shields.io/npm/dm/eslint-plugin-ts-ban-snippets.svg)](https://npmjs.org/package/eslint-plugin-ts-ban-snippets)

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/K3K73ALBJ)

Ban snippets of TypeScript from your project, using eslint.

examples: "return void reject", "it.only", "debugger".

This is an eslint port of [tslint-ban-snippets](https://github.com/mrseanryan/tslint-ban-snippets)

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
  "plugins": ["ts-ban-snippets"],
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "rules": {
    "ts-ban-snippets/ts-ban-snippets": [
      "error",
      {
        "banned": [
          {
            "snippets": ["return void reject", "return void resolve"],
            "message": "Please do not return void - instead place the return statement on the following line."
          }
        ]
      }
    ]
  }
}
```

## authors

Original work by Sean Ryan - mr.sean.ryan(at gmail.com)

## licence = MIT

This project is licensed under the MIT License - see the [LICENSE](https://github.com/mrseanryan/eslint-plugin-ts-ban-snippets/blob/master/LICENSE) file for details

## Rules

- [ts-ban-snippets](./docs/ts-ban-snippets.md)
