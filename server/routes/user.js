import Router from 'koa-router'
import user from '../controllers/user'

// const Router = require('koa-router');
// const user = require('../controllers/user');


const router = new Router({prefix: '/user'})

router.get('/getUserInfo', user.getUserInfo)

// module.exports =  router
export default router
