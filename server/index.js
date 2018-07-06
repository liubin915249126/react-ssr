require("babel-register");
require("babel-polyfill");
const pages = require('../server/readfile');
const koa = require('koa');
const express = require('express');
const router = require('koa-router')();
const app = express();
// const app = new koa();
const render = require('../server/render');


const path = require('path');
const serve = require('koa-static');
const staticCache  = require("koa-static-cache");
const bodyparser = require('koa-bodyparser')

const koaWebpack = require('koa-webpack');
const webpackMiddleware = require("webpack-koa2-middleware");

const openBrowser = require('react-dev-utils/openBrowser');

const webpack = require('webpack');
// const webpackDev = require('koa-webpack-dev-middleware');
// const webpackHot = require('koa-webpack-hot-middleware');
const config = require('../webpack.config')
const compiler = webpack(config);

const webpackDev  = require('webpack-dev-middleware')
const webpackHot = require('webpack-hot-middleware')
const PassThrough = require('stream').PassThrough;

const {layout1} =require ('./layout.js');

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
  console.log(opts)
    const middleware = webpackDev(compiler, opts)
    return async (ctx, next) => {
        await middleware(ctx.req, {
            end: (content) => {
                ctx.body = content
            },
            locals:ctx.state,
            setHeader: (name, value) => {
                ctx.set(name, value)
            }
        }, next)
    }
}

// app.use(webpackMiddleware(compiler, { serverSideRender: true }));

//  koaWebpack({ config,dev: {
//   publicPath: config.output.publicPath,
//   headers: { 'Content-Type': 'text/html; charset=utf-8' },
//   stats: { colors: true },
//   quiet: false,
//   noInfo: true
// }, hot: {
//   log: console.log,
//   path: '/__webpack_hmr',
//   heartbeat: 10 * 1000
// } })
//  .then((middleware) => {
//   app.use(middleware);
// });
 app.use(devMiddleware(compiler,{
  noInfo: false,
  watchOptions: {
      aggregateTimeout: 300,
      poll: true
  },
  publicPath: config.output.publicPath,
  stats: {
      colors: true
  },
  serverSideRender: true 
 }));
// app.use(require("webpack-dev-middleware")(compiler, {
//   noInfo: true, publicPath: config.output.publicPath
// }));
//  app.use(require("webpack-hot-middleware")(compiler));

 app.use(hotMiddleware(compiler,{
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
 }));

// app.use(webpackDev(compiler, {

//   // public path should be the same with webpack config
//   // publicPath: config.output.publicPath,
//   // noInfo: false,
//   // stats: {
//   //     colors: true
//   // },
//   serverSideRender: true 
// }));
// app.use(webpackHot(compiler));


// app.use(require("webpack-dev-middleware")(compiler, {
//   // noInfo: true, publicPath: config.output.publicPath
// }));
// app.use(require("webpack-hot-middleware")(compiler));


app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))

// app.use(serve(path.resolve("./", "build"), {extensions: ['html','js']}));
// app.use(express.static(path.resolve("./", "pages"), {extensions: ['html','js']}));

// app.use(staticCache (path.resolve(__dirname,'build'),{
//   maxAge: 365 * 24 * 60 * 60,
//   gzip:true
// }));

app.use(async (ctx, next) => {
  console.log(ctx.state);
  const assetsByChunkName = ctx.state.webpackStats.toJson().assetsByChunkName;
  console.log(assetsByChunkName);
 
  for(page in assetsByChunkName){
  //   router.get(`/${page}`, render[`render${page}`],(err)=>{
  //     console.log(err)
  //  });
  ctx.set('Content-Type', 'text/html; charset=utf-8');
  // ctx.body = layout1(page,assetsByChunkName[page])
  ctx.body = `
<html>
  <head>
    <title>My App</title>
  </head>
  <body>
    <div id="root"></div>
		<script src="${render[`render${page}`](ctx,next)}"></script>		
  </body>
</html>		
	`;
  }
})

// console.log(pages);
pages.forEach((page,index)=>{
  console.log(render[`render${page}`])
    router.get(`/${page}`, render[`render${page}`],(err)=>{
       console.log(err)
    });
    
 })

// app
//     .use(router.routes())
//     .use(router.allowedMethods());
var reload = require('reload');
var http = require('http');

// var server = http.createServer(app);
//     reload(server, app);

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