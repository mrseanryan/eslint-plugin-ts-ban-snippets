# Banned TypeScript Snippets (`ts-ban-snippets`)

## Example Options

```
    rules: {
        "ts-ban-snippets": [
            "error",
            {
            banned: [
                {
                snippets: ["return void reject", "return void resolve"],
                message:
                    "Please do not return void - instead place the return statement on the following line.",
                },
            ],
            }
        ],
    }
```
