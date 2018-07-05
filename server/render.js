import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Router } from 'react-router-dom'
import {layout} from './layout.js';

import pages from '../server/readfile';

const render = {};

pages.forEach((page,index)=>{
  const Component = require(`../pages/${page}.js`)
  render[`render${index}`] = async(ctx,next)=>{
    const html = ReactDOMServer.renderToString(
      <Component.default />
)
  const body =  layout(html,{});
  ctx.body =body;
}
})



module.exports = render;