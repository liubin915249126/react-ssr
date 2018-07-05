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
                use: ['babel-loader'],
            }
        ]
    }
};

module.exports = [browserConfig];
