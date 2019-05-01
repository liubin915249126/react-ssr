## 升级相关配置
#### 升级webpack
```js
   yarn add webpack
```
>
  Error: Node Sass does not yet support your current environment: OS X 64-bit with Unsupported runtime (64)

  webpack.optimize.OccurenceOrderPlugin is not a constructor
  ```js
     new webpack.optimize.OccurrenceOrderPlugin()
  ```
  webpack.NoErrorsPlugin is not a constructor
  ```
     webpack.NoEmitOnErrorsPlugin
  ```
  configuration.resolve.extensions[0] should not be empty
  You need to specify 'html-loader' instead of 'html'
  ```
     yarn add html-webpack-plugin -D
  ```
>
#### 升级相关 loader
```js
   yarn add css-loader file-loader html-loader json-loader postcss-loader sass-loader style-loader url-loader node-sass babel-loader
```
#### 升级babel
>
It's no longer allowed to omit the '-loader' suffix when using loaders.
You need to specify 'babel-loader' instead of 'babel',

Couldn't find preset "env" relative to directory
    ```
      yarn add @babel/register --dev
    ```
>
```js
   yarn add @babel/core babel-eslint babel-loader babel-plugin-add-module-exports babel-plugin-transform-runtime babel-polyfill @babel/preset-env @babel/preset-react babel-preset-react-hmre @babel/preset-stage-0 babel-register -D
```
#### yarn add mini-css-extract-plugin uglifyjs-webpack-plugin optimize-css-assets-webpack-plugin -D

####
>
Cannot find module 'webpack/lib/removeAndDo' //extract-text-webpack-plugin
>
>
webpack.optimize.DedupePlugin is not a constructor // 有些JS库有自己的依赖树，并且这些库可能有交叉的依赖，DedupePlugin可以找出他们并删除重复的依赖。
>

o.routes is not a function
```js
    router.use(subRouter.default.routes(), subRouter.default.allowedMethods())
```
// default
```js
   yarn add koa koa-bodyparser koa-compose koa-compress koa-convert koa-json koa-logger koa-router koa-session koa-static koa-views
   yarn add koa-webpack-dev-middleware koa-webpack-hot-middleware -D
```
window is not defined
```js
   npm install iso-morphic-style-loader --save-dev
```
#### 404 webpack4.0  废弃了require.ensure
```js
   yarn add react-router-dom
```
