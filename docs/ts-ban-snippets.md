# Banned TypeScript Snippets (`ts-ban-snippets`)

## Options

| Option        | Description                                                                                                                       |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| snippets      | An array of text snippets: raise problem for any code that matches. Cannot be used in combination with regexSnippets.             |
| regexSnippets | An array of regex text snippets: raise problem for any code that matches (as Regex). Cannot be used in combination with snippets. |
| message       | The message to display, if a problem is found.                                                                                    |
| includePaths  | Only parse files where the file path contains one of these values.                                                                |
| excludePaths  | Do NOT parse files where the file path contains one of these values.                                                              |

## Simple Example

### file: .eslintrc

```
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

### Regex example

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

### Example with multiple banned snippets

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

### Example with included and excluded paths

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
