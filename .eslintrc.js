/**
 * @type {import('eslint').Linter.Config}
 **/
module.exports = {
  plugins: ['@typescript-eslint'],
  extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};
