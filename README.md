



# chrome-plugin-template

it is chrome-plugin-cli's  template

##### 目录结构

│  .gitignore
│  manifest.json										谷歌插件配置文件
│  package-lock.json
│  package.json										 依赖文件
│  README.md
│  
├─assets													静态资源存放目录
│  └─images											 谷歌插件Icon目录
│          plugin_outlined_128.png
│          plugin_outlined_16.png
│          plugin_outlined_48.png
│          
├─config												  webpack打包配置，默认生成dist目录
│      webpack.config.js
│      
├─lib														第三方引用插件库
│      jquery.js
│      
├─pages												 谷歌插件开发页面
│  ├─background								 运行在谷歌后台的页面
│  │      index.html
│  │      index.js
│  │      
│  ├─options										插件选项配置页面
│  │      index.html
│  │      index.js
│  │      
│  ├─popup										 点击插件图片弹出页面
│  │      index.html
│  │      index.js
│  │      
│  └─styles										 公共样式文件
│          common.css						 
│          
├─plugin											webpack打包插件
│  └─autoGeneratePlugin
│          generateFile.js
│          index.js

1、如果页面上要引用其他的js文件，css样式文件，要将这些文件通过import的方式在index.js文件引用，因为webpack无法打包link标签的样式文件，还有通过script标签手动引入的js文件(目前是没有找到好的方法)。所以只能通过import方式引入。比如:

```javascript
import './index.css';
import './lib/jquery.js';
```

2、webpack配置目前是配置了css、js(es6转化es5)、代码压缩、tree shaking、公共资源提取(splitChunks)打包。
3、执行npm run build命令后，会生成一个dist文件夹，将这个文件添加到谷歌扩展程序即可使用。
