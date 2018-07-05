require("babel-register");
require("babel-polyfill");
const pages = require('../server/readfile');
const koa = require('koa');
const router = require('koa-router')();
const app = new koa();
const render = require('../server/render');

const openBrowser = require('react-dev-utils/openBrowser');

const middleware = require('koa-webpack');
const webpack = require('webpack');
const webpackDevMiddleware = require('koa-webpack-dev-middleware');
const webpackHotMiddleware = require('koa-webpack-hot-middleware');
const config = require('../webpack.config')
const compiler = webpack(config);

// const webpackDev  = require('webpack-dev-middleware');
// const webpackHot = require('webpack-hot-middleware')
const PassThrough = require('stream').PassThrough;

const devMiddleware = (compiler, opts) => {
    const middleware = webpackDevMiddleware(compiler, opts);
    return async (ctx, next) => {
      await middleware(ctx.req, {
        end: (content) => {
          ctx.body = content;
        },
        setHeader: (name, value) => {
          ctx.set(name, value);
        }
      }, next);
    };
  };


const hotMiddleware = (compiler, opts) => {
  const middleware = webpackHotMiddleware(compiler, opts);
  return async (ctx, next) => {
    let stream = new PassThrough();
    ctx.body = stream;
    await middleware(ctx.req, {
        write: stream.write.bind(stream),
        writeHead: (status, headers) => {
          ctx.status = status;
          ctx.set(headers);
        }
      }, next);
  };
};

// import pages from '../server/readfile';

app.use(middleware({
    compiler: compiler
}));
 
console.log(pages);
pages.forEach((page,index)=>{
    router.get(`/${page}`, render[`render${index}`],(err)=>{
       console.log(err)
    });
    
 })
//  app.use((context, next) =>{
//      console.log(context)
//     return new Promise(()=>{
//         webpackDevMiddleware(compiler, {
//                noInfo: false,
//                publicPath: config.output.publicPath
//              })
//     },(error)=>{
//        console.log(error) 
//     }) 
//  })
// app.use(async (context, next) => {
//     const middleware = webpackDevMiddleware(compiler,{});
//     const hasNext = await applyMiddleware(middleware, context.req, {
//       send: content => context.body = content,
//       setHeader: function() {context.set.apply(context, arguments)}
//     });
//     hasNext && await next();
//   })


//  app.use((context, next)=>{
//      return new Promise(()=>{
//         webpackHotMiddleware(compiler)
//      },(error)=>{
//         console.log(error) 
//      })
//  }
// )
function applyMiddleware(middleware, req, res) {
    const _send = res.send;
    return new Promise((resolve, reject) => {
      try {
        res.send = function() {_send.apply(res, arguments) && resolve(false)};
        middleware(req, res, resolve.bind(null, true));
      } catch (error) {
        reject(error);
      }
    });
  }

  
app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3005,()=>{
    console.log('server is start at port 3005');
    openBrowser("http://localhost:3005/index1")
});

app.on('request',(req,res)=>{
    console.log(111,res)
  if(res.status=="404"){
    res.send("404")
  }
});