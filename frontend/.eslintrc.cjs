module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 'off',
    "indent": [
      "error",
      2
    ],
    "semi": [
      "error",
      "always"
    ],
    "no-unused-vars": "warn",
    "space-before-blocks": "error",
    "func-call-spacing": [
      "error",
      "never"
    ],
    "no-trailing-spaces": ["error", { "skipBlankLines": true }],
    "func-style": ["error", "expression"],
    "space-in-parens": "error",
    "brace-style": "error",
    "space-before-function-paren": ["warn", { "anonymous": "never", "named": "never", "asyncArrow": "never" }],
    "quotes": "off",
  },
};
