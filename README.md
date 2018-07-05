# react-koa-ssr

#### npm init 

#### 安装webpack webpack-cli
```bash
   npm install -g webpack
   npm install webpack webpack-cli --save-dev
```

#### 新建webpack.config.js

```js
   const path = require('path');
    //入口文件
    let entry = {
        index: './module/index/Index_entry.js'
    };

    //浏览器端的配置
    let browserConfig = {
        entry,
        output: {
            path: path.join(__dirname, 'build'),
            publicPath: '/build',
            filename: "js/[name].bundle.js",
            chunkFilename: "js/[id].bundle.js"
        },
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: `babel`,
                }
            ]
        }
    };
    module.exports = [browserConfig];
```

####安装babel-loader
```bash
   npm install --save-dev babel-loader babel-core
```
####配置.babelrc
```bash
   npm install --save-dev babel-preset-env babel-preset-react 
```
#### 启用async
#### 加载html模版
```bash
   npm install html-webpack-plugin --save-dev
```
#### 安装webpack-dev-server
```
   npm install webpack-dev-server --save-dev  
```
#### 安装react
```bash
   npm install react react-dom react-router react-router-dom  --save 
```

config.optimization.splitChunks