const pages = require('./server/readfile.js');
const webpack = require('webpack')
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TimeFixPlugin = require('time-fix-plugin');


const isDebug = process.env.NODE_ENV === 'development'

const hotMiddlewareScript = 'webpack-hot-middleware/client?timeout=20000&reload=true';
const hotMiddlewareScript1 = 'webpack-hot-middleware/client?path=http://localhost:3005/__webpack_hmr'
//入口文件
let entry = {
};
// htmlplugin
let plugins = [];

pages.forEach((page,index)=>{


entry[page] = [ `${__dirname}/pages/${page}.js`,hotMiddlewareScript],  


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
        publicPath: ' ',
        chunkFilename: "js/[id].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: ["babel-loader"],
                // options: {
                //     query:{
                //         // 'presets': [['env'], ['stage-0'], ['react']],
                //         'env': {
                //           'development': {
                //             'presets': ['react-hmre']
                //           }
                //         }
                //       }
                // },
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
        // ...plugins,
        new TimeFixPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoErrorsPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ]
};


module.exports = browserConfig;
