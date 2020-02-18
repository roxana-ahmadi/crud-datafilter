const path = require('path');
module.exports = async ({ config }) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve(__dirname, '../src/'),
    '@js': path.resolve(__dirname, '../src/js'),
    '@pages': path.resolve(__dirname, '../src/pages'),
    '@widgets': path.resolve(__dirname, '../src/widgets'),
  };

  config.module = {
    ...config.module,
    rules: [
      ...config.module.rules,
      {
        test: /\.worker\.js$/,
        use: {loader: 'worker-loader'},
      },
    ],
  };

  return config;
};
