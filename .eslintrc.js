module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["airbnb-base", "prettier", "plugin:node/recommended"],
  plugins: ["prettier"],
  parser: "babel-eslint",
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "prettier/prettier": "error",
    "no-unused-vars": "warn",
    "no-console": "off",
    "func-names": "off",
    "no-process-exit": "off",
    "object-shorthand": "off",
    "class-methods-use-this": "off",
    yoda: ["error", "never"],
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
    "no-shadow": "off",
    "space-before-function-paren": [
      "error",
      {
        anonymous: "never",
        named: "never",
        asyncArrow: "never",
      },
    ],
    "prefer-const": [
      "error",
      {
        destructuring: "any",
        ignoreReadBeforeAssign: false,
      },
    ],
    quotes: ["error", "double"],
    "quote-props": ["error", "as-needed"],
    endOfLine: "lf",
  },
};
