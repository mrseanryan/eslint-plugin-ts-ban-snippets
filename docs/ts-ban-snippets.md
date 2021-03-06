# Banned TypeScript Snippets (`ts-ban-snippets`)

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

### Example with excluded paths

### file: .eslintrc

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
            "excludePaths": ["excluded"]
          }
        ]
      }
    ]
  }
}
```
