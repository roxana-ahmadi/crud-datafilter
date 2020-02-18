/*
 * Copyright (c) 2019-present, The Yumcoder Authors. All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  addWebpackModuleRule,
} = require('customize-cra'); // eslint-disable-line
const path = require('path');

module.exports = override(
  config => ({
    ...config,
    output: {
      ...config.output,
      globalObject: 'this',
    },
  }),

  addWebpackModuleRule({
    test: /\.worker\.js$/,
    use: { loader: 'worker-loader' },
  }),

  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),

  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1DA57A' },
  }),

  // when adding alias, also it need to config vscode, jest and eslint:
  //  vscode --> root/jsconfig.json
  //  jest --> package.json
  //  eslint --> .eslintrc.js
  addWebpackAlias({
    '@js': path.resolve(__dirname, './src/js'),
    '@pages': path.resolve(__dirname, './src/pages'),
    '@widgets': path.resolve(__dirname, './src/widgets'),
  }),
);
