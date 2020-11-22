module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: 'babel-eslint',
  plugins: ['react', 'react-hooks', 'prettier'],
  extends: ['airbnb', 'plugin:react/recommended', 'plugin:prettier/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    React: true,
    document: true,
    window: true,
    localStorage: true,
    fetch: true,
  },
  rules: {
    'import/prefer-default-export': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'react/prop-types': 'warn',
    'no-underscore-dangle': 0,
    'react/jsx-filename-extension': 'off',
    'import/no-unresolved': 'off',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/jsx-props-no-spreading': 0,
    'jsx-a11y/anchor-is-valid': 0,
  },
}
