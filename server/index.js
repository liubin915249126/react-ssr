const koa = require('koa');
const router = require('koa-router')();
const app = new koa();

require("babel-register");

// import pages from '../server/readfile';
const pages = require('../server/readfile');

pages.forEach((page,index)=>{
    // import render from '../server/render'
    const render = require('../server/render');
    router.get(`/${page}`, render[`render${index}`]);
    
 })




app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3001,()=>{
    console.log('server is start at port 3001')
});