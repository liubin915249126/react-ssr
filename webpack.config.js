const webpack = require('webpack')
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pages = require('./server/readfile.js');

const isDebug = process.env.NODE_ENV === 'development'


//入口文件
let entry = {};
let plugins = [];
console.log(pages)
pages.forEach((page,index)=>{
  entry[page] = `${__dirname}/pages/${page}.js`,
  plugins[index] =  new HtmlWebpackPlugin({
    title:'react 学习',
    inject:'body',
    chunks: [page],
    filename: `${page}.html`,
    template:path.resolve(__dirname, "index.html")
})
})

//浏览器端的配置
let browserConfig = {
    mode: isDebug ? 'development' : 'production',
    entry,
    output: {
        path: path.join(__dirname, 'build'),
        filename: "js/[name].bundle.js",
        chunkFilename: "js/[id].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            }
        ]
    },
    devServer: {
        contentBase: "./Script",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,
        port:8083,
        proxy:{
            '/': { target: 'http://localhost:3000', secure: false }
        }
    },
    plugins:[
        ...plugins
    ]
};


module.exports = [browserConfig];
