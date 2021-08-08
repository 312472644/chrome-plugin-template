const path = require('path');
const glob = require('glob');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const utils = {
    /**
     * 获取文件绝对路径
     *
     * @param {*} filePath 文件夹路径
     * @return {*} 
     */
    getAbsFilePath(filePath) {
        return path.join(process.cwd(), filePath);
    },
    /**
     * 获取文件路径所有文件
     *
     * @param {*} filePath 文件路径
     */
    getDirectoryAllFile(filePath) {
        const entry = {
            jsFile: {},
            htmlFile: {},
            cssFile: {}
        };
        const directoryList = glob.sync(path.join(`${this.getAbsFilePath(filePath)}/**/*`), { nodir: true });
        directoryList.forEach(item => {
            const fileList = item.split('/');
            const pageName = fileList[fileList.length - 2];
            const fileName = fileList[fileList.length - 1];
            if (fileName.endsWith('.js')) {
                entry.jsFile[pageName] = item;
            }
            if (fileName.endsWith('.html')) {
                entry.htmlFile[pageName] = item;
            }
        })
        return entry;
    },
    /**
     * 获取多文件打包html文件
     *
     * @param {*} template
     */
    getHtmlTemplateList(template) {
        const htmlTemplateList = [];
        for (const pageName in template) {
            htmlTemplateList.push(new HtmlWebPackPlugin({
                publicPath: '../',
                inject: true,
                minify: true,
                template: template[pageName],
                filename: `/${pageName}/index.html`,
                chunks: ['common', pageName]
            }));
        }
        return htmlTemplateList;
    }
};

module.exports = utils;