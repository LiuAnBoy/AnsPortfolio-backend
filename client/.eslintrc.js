module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: "babel-eslint",
  parserOptions: {
    parser: "babel-eslint",
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    "airbnb-base",
    "eslint:recommended",
    "plugin:react/recommended", // React rules
    "plugin:react-hooks/recommended", // React hooks rules
  ],
  plugins: ["prettier", "react-hooks", "react"],
  // add your custom rules here
  rules: {
    "no-unused-vars": "warn",
    "no-console": "off",
    "func-names": "off",
    "no-process-exit": "off",
    "object-shorthand": "off",
    "class-methods-use-this": "off",
    semi: ["error", "always"],
    "space-before-function-paren": [
      "error",
      {
        anonymous: "never",
        named: "never",
        asyncArrow: "never",
      },
    ],
    "template-curly-spacing": ["error", "always"],
    yoda: ["error", "never"],
    "no-unneeded-ternary": "off",
    "react/prop-types": 0,
    "prefer-const": [
      "error",
      {
        destructuring: "any",
        ignoreReadBeforeAssign: false,
      },
    ],
    quotes: ["error", "double"],
    "quote-props": ["error", "as-needed"],
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    "no-underscore-dangle": ["error", { allow: ["_id", "_store"] }],
  },
};
