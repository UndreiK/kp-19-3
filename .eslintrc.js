const { before } = require("lodash")

module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["plugin:react/recommended", "standard"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    semi: [2, "never"],
    indent: [
      "error",
      2,
      {
        ignoredNodes: ["ConditionalExpression", "TemplateLiteral *"]
      }
    ],
    "multiline-ternary": "off",
    "space-before-function-paren": [
      "error",
      { anonymous: "always", named: "never" }
    ],
    quotes: ["error", "double", { allowTemplateLiterals: true }]
  }
}
