# Banned TypeScript Snippets (`ts-ban-snippets`)

To ban particular snippets of TypeScript code, you simply edit the `.eslintrc` file.

## Options

| Option        | Description                                                                                                                       |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| snippets      | An array of text snippets: raise problem for any code that matches. Cannot be used in combination with regexSnippets.             |
| regexSnippets | An array of regex text snippets: raise problem for any code that matches (as Regex). Cannot be used in combination with snippets. |
| message       | The message to display, if a problem is found.                                                                                    |
| includePaths  | Only parse files where the file path contains one of these values.                                                                |
| excludePaths  | Do NOT parse files where the file path contains one of these values.                                                              |

## Simple Example `.eslintrc`

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
                    "message":
                        "Please do not return void - instead place the return statement on the following line.",
                    },
                ],
            }
        ],
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
