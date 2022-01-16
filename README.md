# :no_entry_sign: eslint-plugin-ts-ban-snippets readme

Ban snippets of TypeScript from your project, using a custom eslint rule 'ts-ban-snippets'.

examples: "return void reject", "it.only", "debugger".

This is an eslint port of [tslint-ban-snippets](https://github.com/mrseanryan/tslint-ban-snippets)

![CI CD Build](https://github.com/mrseanryan/eslint-plugin-ts-ban-snippets/actions/workflows/node.js.yml/badge.svg)

[![Size](https://packagephobia.now.sh/badge?p=eslint-plugin-ts-ban-snippets)](https://packagephobia.now.sh/result?p=eslint-plugin-ts-ban-snippets)

[![Dependencies](https://david-dm.org/mrseanryan/eslint-plugin-ts-ban-snippets.svg)](https://david-dm.org/mrseanryan/eslint-plugin-ts-ban-snippets)

[![npm Package](https://img.shields.io/npm/v/eslint-plugin-ts-ban-snippets.svg?style=flat-square)](https://www.npmjs.org/package/eslint-plugin-ts-ban-snippets)
[![NPM Downloads](https://img.shields.io/npm/dm/eslint-plugin-ts-ban-snippets.svg)](https://npmjs.org/package/eslint-plugin-ts-ban-snippets)

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/K3K73ALBJ)

## features

- a custom eslint rule that can detect code snippets that are not desired
- configurable for multiple code snippets
- can include/exclude file paths
- the error message can also be configured

The rule is quite flexible and could potentially avoid having to create multiple custom eslint rules.

## Installation

This plugin requires your project to use TypeScript (>=4.1.3).

```sh
yarn add eslint-plugin-ts-ban-snippets --dev
```

## Example Configurations

The plugin relies on TypeScript compiler services to resolve types.

The following examples show how to configure banned snippets in the `.eslintrc` file(s) of your project.

note: in the `.eslintrc` file, you need to set your `tsconfig.json` file in your eslint configuration via `parserOptions`:

```json
{
  "plugins": ["ts-ban-snippets"],
  "parserOptions": {
    "project": "./tsconfig.json"
  }
}
```

### Simple example `.eslintrc`

This example detects use of `return void reject` or `return void resolve` and raises an error.

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

### Regex example `.eslintrc`

This example also detects use of `return void reject` or `return void resolve` and raises an error - but using a regular expression.

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
            "regexSnippets": ["return void [reject|resolve]"],
            "message": "Please do not return void - instead place the return statement on the following line."
          }
        ]
      }
    ]
  }
}
```

### Example `.eslintrc` with multiple banned snippets

This example has a list of banned snippets:

- ban `return void reject` or `return void resolve`
- ban only enabling some tests via `it.only` or `describe.only`
- ban disabling tests via `it.skip` or test suites via `describe.skip`


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
          },
          {
            "snippets": ["it.only", "describe.only"],
            "message": "Do not enable only some tests."
          },
          {
            "snippets": ["it.skip", "describe.skip"],
            "message": "Do not skip tests."
          }
        ]
      }
    ]
  }
}
```

### Example `.eslintrc` with included and excluded paths

This example has one banned snippet (`return void reject` or `return void resolve`).

Only files with a path that contains `my-component` and does not contain `excluded` are scanned.

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
            "message": "Please do not return void - instead place the return statement on the following line.",
            "includePaths": ["my-component"],
            "excludePaths": ["excluded"]
          }
        ]
      }
    ]
  }
}
```

For working tests, please see the [unit tests](https://github.com/mrseanryan/eslint-plugin-ts-ban-snippets/blob/master/tests).

For a real code example, see the [test harness](https://github.com/mrseanryan/eslint-plugin-ts-ban-snippets/tree/main/itests/simple-harness).  In particular, the [.eslintrc](https://github.com/mrseanryan/eslint-plugin-ts-ban-snippets/tree/main/itests/simple-harness/.eslintrc) file.

## authors

Original work by Sean Ryan - mr.sean.ryan(at gmail.com)

## licence = MIT

This project is licensed under the MIT License - see the [LICENSE](https://github.com/mrseanryan/eslint-plugin-ts-ban-snippets/blob/master/LICENSE) file for details

## Rules

For available options and for examples, see the Rule doc:

- [ts-ban-snippets](./docs/ts-ban-snippets.md)
