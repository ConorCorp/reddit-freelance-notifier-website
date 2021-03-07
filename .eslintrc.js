module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "indent": ["error", 4],
    "no-unused-vars": "off",
    "no-undef": "off"
  },
};