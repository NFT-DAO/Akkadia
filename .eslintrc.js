module.exports = {
  root: true,
  env: {
    commonjs: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'indent': [
      'error', 2
    ],
    'quotes': [
      'error', 'single'
    ],
    'semi': [
      'error', 'never'
    ],
    'eqeqeq': 'error',
    'object-curly-spacing': [
      'error', 'always'
    ],
    'arrow-spacing': [
      'error', { before: true, after: true }
    ],
    'react/prop-types': 0,
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
