# react-koa-ssr

#### npm init 

#### 安装webpack
```bash
   npm install -g webpack
   npm install webpack ---save-dev
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
