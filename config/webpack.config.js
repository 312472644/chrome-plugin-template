const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const getAbsFilePath = (fileName) => {
  return path.join(process.cwd(), fileName);
};

module.exports = {
  mode: 'development',
  entry: {
    popup: getAbsFilePath('/pages/popup/index.js')
  },
  output: {
    path: getAbsFilePath('/dist'),
    filename: '[name]/index.js',
    // 环境设置
    environment: {
      arrowFunction: false,
      const: false,
      destructuring: false,
      forOf: false
    },
    clean: true
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
              useBuiltIns: 'usage'
            }]
          ]
        }
      }
    }]
  },
  resolve: {
    extensions: [".js", ".css"],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: getAbsFilePath('/pages/popup/index.html'),
      minify: true,
      filename: '/popup/index.html',
      inject: false
    })
  ]
  // devtool: 'cheap-module-eval-source-map'
};