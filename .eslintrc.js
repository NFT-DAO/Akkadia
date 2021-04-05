// usage note: eslint should be used to manage CODE QUALITY rules

module.exports = {
  root: true,
  env: {
    commonjs: true,
    node: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier', // note: this must be the LAST config
  ],
  rules: {
    eqeqeq: 'error',
    'prefer-const': 'error',
    'arrow-body-style': ['error', 'always'],
    'no-unused-vars': 'warn',
    'react/prop-types': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
