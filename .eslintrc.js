module.exports = {
  extends: [
    '@linters/eslint-config-node',
    '@linters/eslint-config-typescript',
    '@linters/eslint-config-jest',
    'prettier',
  ],
  rules: {
    'security/detect-object-injection': 0,
    '@typescript-eslint/no-dynamic-delete': 0,
    'guard-for-in': 1,
  }
}
