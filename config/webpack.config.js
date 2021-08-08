const utils = require('./utils/index.js');
const AutoGeneratePlugin = require('../plugin/autoGeneratePlugin/index.js');
const { jsFile, htmlFile } = utils.getDirectoryAllFile('/pages');

module.exports = {
  mode: 'production',
  entry: jsFile,
  output: {
    path: utils.getAbsFilePath('/dist'),
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
    rules: [
      {
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
      },
      {
        test: /\.css$/,
        include: /pages/,
        use: ['css-loader']
      }]
  },
  resolve: {
    extensions: [".js", ".css"],
  },
  plugins: [
    ...utils.getHtmlTemplateList(htmlFile),
    new AutoGeneratePlugin()
  ],
  optimization: {
    splitChunks: {
      minSize: 10,
      cacheGroups: {
        commons: {
          name: 'common',
          chunks: 'all',
          minChunks: 2
        }
      },
    },
  }
};