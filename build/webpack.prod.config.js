const path = require("path"),
    fs = require("fs"),
    webpack = require("webpack"),
    autoprefixer = require("autoprefixer"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    UglifyJsPlugin = require("uglifyjs-webpack-plugin"),
    // ExtractTextPlugin = require("extract-text-webpack-plugin"),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
let clientConfig, serverConfig;

function getExternals() {
    return fs
        .readdirSync(path.resolve(__dirname, "../node_modules"))
        .filter(filename => !filename.includes(".bin"))
        .reduce((externals, filename) => {
            externals[filename] = `commonjs ${filename}`;

            return externals;
        }, {});
}

clientConfig = {
    mode:'production',
    context: path.resolve(__dirname, ".."),
    entry: {
        bundle: "./client",
        // vendor: ["react", "react-dom", "redux", "react-redux", "superagent"]
    },
    output: {
        path: path.resolve(__dirname, "../dist/client"),
        filename: "[name].[chunkhash:8].js",
        chunkFilename: "chunk.[name].[chunkhash:8].js",
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                exclude: /^node_modules$/,
                use: ["babel-loader"]
            },
            {
                test:/\.scss$/,
                use: [ 'style-loader', {
                    loader:'css-loader',
                    options:{
                        modules:true,
                        camelCase:true,
                        importLoaders:1,
                        localIdentName:`[name]__[local]__[hash:base64:8]`
                    }
                },'sass-loader'],
            },
            {
                test: /\.(jpg|png|gif|webp)$/,
                use: ["url-loader?limit=8000"]
            },
            {
                test: /\.json$/,
                use: "json"
            },
            {
                test: /\.html$/,
                use:[ {
                    loader:'html-loader',
                    options:{
                        minimize:false,
                    }
                }]
            }
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
              cache: true,
              parallel: true,
              sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        runtimeChunk: {
            name: "manifest"
        },
        // minimizer: true, // [new UglifyJsPlugin({...})]
        splitChunks: {
            chunks: "async",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: false,
            cacheGroups: {
                vendor: {
                    name: "vendor",
                    chunks: "initial",
                    priority: -10,
                    reuseExistingChunk: false,
                    test: /node_modules\/(.*)\.js/
                },
                // 处理异步chunk
                "async-vendors": {
                    test: /[\\/]node_modules[\\/]/,
                    minChunks: 2,
                    chunks: "async",
                    name: "async-vendors"
                },
                antd: {
                    name: "chunk-antd", // 单独将 antd 拆包
                    priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
                    test: /[\/]node_modules[\/]antd[\/]/
                },
                // styles: {
                //   name: 'styles',
                //   test: /\.(scss|css)$/,
                //   chunks: 'all',
                //   minChunks: 1,
                //   reuseExistingChunk: true,
                //   enforce: true
                // }
            }
        }
    },
    // postcss: [autoprefixer({ browsers: ["> 5%"] })],
    resolve: { extensions: [".js", ".json", ".scss"] },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        }),
        new HtmlWebpackPlugin({
            filename: "../../views/prod/index.html",
            template: "./views/tpl/index.tpl.html",
            chunksSortMode: "none"
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        // new ExtractTextPlugin("[name].[contenthash:8].css", { allChunks: true }),
        new CleanWebpackPlugin({cleanAfterEveryBuildPatterns:[path.join(__dirname, 'dist')]})
    ]
};

serverConfig = {
    mode:'production',
    context: path.resolve(__dirname, ".."),
    entry: { server: "./server/server.prod" },
    output: {
        path: path.resolve(__dirname, "../dist/server"),
        filename: "[name].js",
        chunkFilename: "chunk.[name].js"
    },
    target: "node",
    node: {
        __filename: true,
        __dirname: true
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                exclude: /^node_modules$/,
                use: ["babel-loader"]
            },
            {
                test:/\.scss$/,
                use: [ 'style-loader', {
                    loader:'css-loader',
                    options:{
                        modules:true,
                        camelCase:true,
                        importLoaders:1,
                        localIdentName:`[name]__[local]__[hash:base64:8]`
                    }
                },'sass-loader'],
            },
            {
                test: /\.(jpg|png|gif|webp)$/,
                use: ["url-loader?limit=8000"]
            },
            {
                test: /\.json$/,
                use: "json"
            }
        ]
    },
    externals: getExternals(),
    resolve: { extensions: [".js", ".json", ".scss"] },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.optimize.DedupePlugin(),
        new CleanWebpackPlugin({cleanAfterEveryBuildPatterns:[path.join(__dirname, 'dist')]}),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: { warnings: false },
        //     comments: false
        // }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        })
    ]
};

module.exports = [clientConfig, serverConfig];

