# eslint-plugin-literal-blacklist

An ESLint micro plugin.

## Installation

```
$ npm install eslint-plugin-literal-blacklist --save-dev
```

## Usage

```
// .eslintrc
{
  "plugins": [
    "literal-blacklist"
  ],
  "rules": {
    "literal-blacklist/literal-blacklist": [2, ["put", "your", "rule"]]
  }
}
```

## Supported Rules

### `literal-blacklist`

Define blacklist strings for literal.
