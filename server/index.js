require("babel-register");
require("babel-polyfill");
const pages = require('../server/readfile');
const koa = require('koa');
const express = require('express');
const router = require('koa-router')();
// const app = express();
const app = new koa();
const render = require('../server/render');

const path = require('path');
const serve = require('koa-static');

const openBrowser = require('react-dev-utils/openBrowser');

const webpack = require('webpack');
// const webpackDev = require('koa-webpack-dev-middleware');
// const webpackHot = require('koa-webpack-hot-middleware');
const config = require('../webpack.config')
const compiler = webpack(config);

const webpackDev  = require('webpack-dev-middleware')
const webpackHot = require('webpack-hot-middleware')
const PassThrough = require('stream').PassThrough;

const hotMiddleware = (compiler, opts) => {
    const middleware = webpackHot(compiler, opts);
    return async (ctx, next) => {
        let stream = new PassThrough()
        ctx.body = stream
        await middleware(ctx.req, {
            write: stream.write.bind(stream),
            writeHead: (status, headers) => {
                ctx.status = status
                ctx.set(headers)
            },
          //   end: (content) => {
          //     ctx.body = content
          // },
          // setHeader: (name, value) => {
          //     ctx.set(name, value)
          // }
        }, next)
    }
    
}
const devMiddleware = (compiler, opts) => {
    const middleware = webpackDev(compiler, opts)
    return async (ctx, next) => {
        await middleware(ctx.req, {
            end: (content) => {
                ctx.body = content
            },
            setHeader: (name, value) => {
                ctx.set(name, value)
            }
        }, next)
    }
}

console.log(pages);
pages.forEach((page,index)=>{
    router.get(`/${page}`, render[`render${index}`],(err)=>{
       console.log(err)
    });
    
 })

 app.use(devMiddleware(compiler));
 app.use(hotMiddleware(compiler),{
  // log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
 });

app.use(serve(path.resolve("./", "build"), {extensions: ['html']}));

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3005,()=>{
    console.log('server is start at port 3005');
    openBrowser("http://localhost:3005/index1")
});

// app.on('request',(req,res)=>{
//     console.log(111,res)
//   if(res.status=="404"){
//     res.send("404")
//   }
// });