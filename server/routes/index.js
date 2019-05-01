import fs from 'fs'
import path from 'path'
import Router from 'koa-router'

// const fs = require('fs');
// const path = require('path');
// const Router = require('koa-router');


const router = new Router({prefix: '/api'})
let subRouter

fs.readdirSync(__dirname)
    .filter(filename =>
        filename !== path.basename(__filename)
    )
    .forEach(filename => {
        subRouter = require(`./${filename}`)
        router.use(subRouter.routes(), subRouter.allowedMethods())
    })

// module.exports =  router
export default router
