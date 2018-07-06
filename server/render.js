import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Router, StaticRouter, matchPath } from 'react-router-dom'
import {layout} from './layout.js';

import pages from '../server/readfile';
import { matchRoutes, renderRoutes } from 'react-router-config';

const router =  pages.map((page)=>{
  return {
    path: `/${page}`,
    // exact:true,
    component: require(`../pages/${page}.js`).default
  }
})

/**
 * 匹配当前请求url是否跟客户端路由一致 不一致则执行next 进行静态资源处理等
 * @param {*} routesArray 
 * @param {*} url 
 */
const getMatch=(routesArray, url)=>{
  return routesArray.some(router=>matchPath(url,{
    path: router.path,
    exact: router.exact,
  }))
}

const render = {};

pages.forEach((page,index)=>{
  const Component = require(`../pages/${page}.js`)
  render[`render${page}`] = async(ctx,next)=>{ 
    const branch = matchRoutes(router, ctx.req.url);
    const promises = branch.map(({route}) => {
        const fetch = route.component.fetch;
        return fetch instanceof Function ? fetch(store) : Promise.resolve(null)
    });
    await Promise.all(promises).catch((err)=>{
        console.log(err);
    }); 
    let isMatch=getMatch(router,ctx.req.url);
     if(!isMatch){
        await next();
     }else{
      const html = ReactDOMServer.renderToString(
        <StaticRouter
          location={ctx.url}
          context={{}}>
           <Component.default />
        </StaticRouter>
      )
      const body =  layout(html,{});
      ctx.body =body;
    }
    return body;
   }
})


for(let renderitem in render){
  module.exports[renderitem] = render[renderitem];
}

