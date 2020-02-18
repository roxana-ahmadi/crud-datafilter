module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    page: true,
    browser: true,
    context: true,
    jestPuppeteer: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      classes: true,
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 'off',
    'import/no-extraneous-dependencies': [
      'off',
      { devDependencies: ['**/*.stories.js', '**/*.stories.jsx'] },
    ],
  },
  settings: {
    'import/resolver': {
      alias: [
        ['@', './src/'],
        ['@js', './src/js'],
        ['@pages', './src/pages'],
        ['@widgets', './src/widgets'],
      ],
    },
  },
};
