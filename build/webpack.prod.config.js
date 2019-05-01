const path = require("path"),
    fs = require("fs"),
    webpack = require("webpack"),
    autoprefixer = require("autoprefixer"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    ExtractTextPlugin = require("extract-text-webpack-plugin");
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
        vendor: ["react", "react-dom", "redux", "react-redux", "superagent"]
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
            }
            // {
            //     test: /\.html$/,
            //     loader: 'html?minimize=false'
            // }
        ]
    },
    postcss: [autoprefixer({ browsers: ["> 5%"] })],
    resolve: { extensions: ["", ".js", ".json", ".scss", ""] },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: ["vendor", "manifest"],
            filename: "[name].[chunkhash:8].js"
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            comments: false
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        }),
        new HtmlWebpackPlugin({
            filename: "../../views/prod/index.html",
            template: "./views/tpl/index.tpl.html",
            chunksSortMode: "none"
        }),
        new ExtractTextPlugin("[name].[contenthash:8].css", { allChunks: true })
    ]
};

serverConfig = {
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
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    presets: ["env", "react"],
                    plugins: ["add-module-exports"],
                    cacheDirectory: true
                }
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
                loader: "url?limit=8000"
            },
            {
                test: /\.json$/,
                loader: "json"
            }
        ]
    },
    externals: getExternals(),
    resolve: { extensions: ["", ".js", ".json", ".scss"] },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            comments: false
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        })
    ]
};

module.exports = [clientConfig, serverConfig];
