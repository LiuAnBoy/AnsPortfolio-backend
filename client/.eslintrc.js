module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    parser: 'babel-eslint',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ['airbnb', 'prettier', 'eslint:recommended'],
  plugins: ['react', 'react-hooks', 'prettier'],
  // add your custom rules here
  rules: {
    'prettier/prettier': 'error',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    semi: ['error', 'always'],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    yoda: ['error', 'never'],
    'no-unneeded-ternary': 'off',
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false,
      },
    ],
    quotes: ['error', 'single', { avoidEscape: true }],
    'quote-props': ['error', 'as-needed'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-underscore-dangle': ['error', { allow: ['_id', '_store'] }],
    'no-unused-vars': 'warn',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'react/forbid-prop-types': 'off',
  },
};
