# eslint-plugin-literal-blacklist

An ESLint micro plugin.

## Installation

```
$ npm install eslint-plugin-literal-blacklist --save-dev
```

## Usage

You can put string or object in an array.

```
// .eslintrc
{
  "plugins": [
    "literal-blacklist"
  ],
  "rules": {
    "literal-blacklist/literal-blacklist": [2, ["put", "your", "string", "or", {
      term: "object",
      message: "custom message",
    }]]
  }
}
```

## Supported Rules

### `literal-blacklist`

Define blacklist strings for literal.
