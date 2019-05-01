const path = require("path"),
    webpack = require("webpack"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    ProgressBarPlugin = require("progress-bar-webpack-plugin"),
    MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    UglifyJsPlugin = require("uglifyjs-webpack-plugin"),
    OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
module.exports = {
    mode:'development',
    devtool: "eval-source-map",
    context: path.resolve(__dirname, ".."),
    entry: {
        bundle: [
            "./client",
            "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000"
        ],
        vendor: ["react", "react-dom", "redux", "react-redux", "superagent"]
    },
    output: {
        path: path.resolve(__dirname, "../dist/client"),
        filename: "[name].js",
        chunkFilename: "chunk.[name].js",
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
                use: [
                    // 'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                          // you can specify a publicPath here
                          // by default it uses publicPath in webpackOptions.output
                          publicPath: '../',
                          hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    {
                    loader:'css-loader',
                    options:{
                        modules:true,
                        camelCase:true,
                        importLoaders:1,
                        localIdentName:`[name]__[local]__[hash:base64:8]`
                    }
                },{
                    loader:'sass-loader',
                    // options:{
                    //     javascriptEnabled: true,
                    // }
                }
               ],
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
                styles: {
                  name: 'styles',
                  test: /\.(scss|css)$/,
                  chunks: 'all',
                  minChunks: 1,
                  reuseExistingChunk: true,
                  enforce: true
                }
            }
        }
    },
    resolve: { extensions: [".js", ".json", ".scss"] },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.optimize.CommonsChunkPlugin({
        //     names: ['vendor', 'manifest'],
        //     filename: '[name].js'
        // }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        }),
        new HtmlWebpackPlugin({
            filename: "../views/dev/index.html",
            template: "./views/tpl/index.tpl.html"
        }),
        new ProgressBarPlugin({ summary: false }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ]
};
