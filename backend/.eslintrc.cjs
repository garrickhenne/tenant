/* eslint-env node */
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', '@stylistic'],
  rules: {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "semi": [
      "error",
      "always"
    ],
    "no-var": "error",
    "no-console": "off",
    "no-unused-vars": "warn",
    "func-call-spacing": [
      "error",
      "never"
    ],
    "space-before-blocks": "error",
    "keyword-spacing": "error",
    "no-trailing-spaces": ["error", { "skipBlankLines": true }],
    "semi-spacing": "error",
    "func-style": ["error", "expression"],
    "space-infix-ops": "error",
    "space-in-parens": "error",
    "camelcase": "error",
    "eqeqeq": "error",
    "brace-style": "error",
    "space-before-function-paren": ["warn", { "anonymous": "never", "named": "never", "asyncArrow": "never" }],
    "func-names": ["error", "never"],
    "quotes": "off",
    "@stylistic/object-curly-spacing": ["error", "always"]
  },
  root: true,
};