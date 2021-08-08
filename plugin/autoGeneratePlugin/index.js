const generateFile = require('./generateFile.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * 自动生成manifest.json 以及生成icon文件
 * 
 * @class AutoGeneratePlugin
 */
class AutoGeneratePlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        compiler.hooks.compilation.tap('compilation', (compilation) => {
            HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync('html-webpack-plugin-before-html-processing', (htmlPluginData, callback) => {
                console.log('htmlPluginData', htmlPluginData.html);
                htmlPluginData.html = htmlPluginData.html.replace('<script src="./index.js"></script>', '');
                callback(null, htmlPluginData);
            })
        });
        compiler.hooks.afterEmit.tapAsync('auto-generate', (compilation, callback) => {
            generateFile();
            callback(null, compilation);
        })
    }
}

module.exports = AutoGeneratePlugin;