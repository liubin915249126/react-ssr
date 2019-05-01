import 'babel-polyfill'
import serve from 'koa-static'
import path from 'path'
import views from 'koa-views'
import app from './app'
import router from './routes'
import clientRoute from './middlewares/clientRoute'

// require('babel-polyfill')
// const serve = require('koa-static')
// const path = require('path')
// const views = require('koa-views')
// const app = require('./app')
// const router = require('./routes')
// const clientRoute = require('./middlewares/clientRoute')

// const port = process.env.port || 3030
const port = 3031

app.use(views(path.resolve(__dirname, '../views/prod'), {map: {html: 'ejs'}}))

app.use(serve(path.resolve(__dirname, '../dist/client')))
app.use(clientRoute)
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(port)
console.log(111, path.resolve(__dirname, '../views/prod'))
console.log(`\n==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`)
