



# chrome-plugin-template

it is chrome-plugin-cli's  template

##### 目录结构

```
├─ .gitignore
├─ assets								静态资源文件
│  └─ images
│     ├─ plugin_outlined_128.png
│     ├─ plugin_outlined_16.png
│     └─ plugin_outlined_48.png
├─ config								webpack打包配置
│  ├─ utils
│  │  └─ index.js
│  └─ webpack.config.js
├─ lib									第三方插件目录
│  ├─ chrome_utils.min.js
│  └─ jquery.js
├─ manifest.json						chrome插件配置
├─ package-lock.json
├─ package.json
├─ pages
│  ├─ background						运行在chrome后台的页面
│  │  ├─ index.html
│  │  └─ index.js
│  ├─ options							chrome插件选项配置页面
│  │  ├─ index.html
│  │  └─ index.js
│  ├─ popup								点击chrome icon弹出页面
│  │  ├─ index.html
│  │  └─ index.js
│  └─ styles							公共样式
│     └─ common.css
├─ plugin								webpack pulugin
│  └─ autoGeneratePlugin
│     ├─ generateFile.js
│     └─ index.js
└─ README.md
```



1、如果页面上要引用其他的js文件，css样式文件，要将这些文件通过import的方式在index.js文件引用，因为webpack无法打包link标签的样式文件，还有通过script标签手动引入的js文件(目前是没有找到好的方法)。所以只能通过import方式引入。比如:

```javascript
import './index.css';
import './lib/jquery.js';
```

2、webpack配置目前是配置了css、js(es6转化es5)、代码压缩、tree shaking、公共资源提取(splitChunks)打包。
3、执行npm run build命令后，会生成一个dist文件夹，将这个文件添加到谷歌扩展程序即可使用。

4、lib文件有个chrome_utils.min.js，该js文件是封装了一些chrome插件的内对象以及方法，使用方法请见：https://github.com/312472644/chrome-utils-tools#readme

