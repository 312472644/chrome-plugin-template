const path = require('path');
const fs = require('fs');
const color = require('colors');
const fsExtra = require('fs-extra');

const isObjectNull = (param) => {
    return Object.keys(param).length > 0;
}

const generateManifestJson = () => {
    try {
        const manifestJsonPath = path.join(process.cwd(), './manifest.json');
        let content = fs.readFileSync(manifestJsonPath).toString();
        content = content.replace(new RegExp('./pages', 'g'), '.').replace(new RegExp('./assets', 'g'), '.');
        fs.writeFileSync(path.join(process.cwd(), './dist/manifest.json'), JSON.stringify(JSON.parse(content), null, '\t'), 'utf-8');
    } catch (error) {
        console.error(`创建manifest失败,${error}`.red);
    }
}

/**
 * 生成文件
 *
 */
const generateFile = () => {
    const manifestPath = path.join(process.cwd(), 'manifest.json');
    const configJson = fs.readFileSync(manifestPath, 'utf-8');
    if (isObjectNull(configJson)) {
        // 获取icon对象
        const icons = JSON.parse(configJson).icons;
        const distPath = path.join(process.cwd(), './dist');
        if (isObjectNull(icons)) {
            // 将assets目录拷贝到dist文件
            fsExtra.copySync(path.join(process.cwd(), './assets'), distPath);
            generateManifestJson();
        } else {
            throw new Error('icon属性不存在'.red);
        }
    }
}

module.exports = generateFile;