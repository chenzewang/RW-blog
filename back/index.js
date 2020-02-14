const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const Router = require('./router.js')
const bodyParser = require('koa-bodyparser')
const {
  connect,
  initSchemas
} = require('./database/init.js')
connect()
initSchemas()

//跨域
const cors = require('koa2-cors')
app.use(cors())

//body parser
app.use(bodyParser());

//api
// let router = new Router();

// let user = require('./api/user.js')
// router.use('/user', user.routes())

// let goods = require('./api/goods.js')
// router.use('/goods', goods.routes())

// let article = require('./api/article.js')
// router.use('/article', article.routes())

// let life = require('./api/life.js')
// router.use('/life', article.routes())
// console.log(Router);

app.use(Router.routes())
app.use(Router.allowedMethods())



// app.use(async (ctx) => {
//   ctx.body = JSON.stringify(ctx)
// })


app.listen(3000, () => {
  console.log('[Server] starting at port 3000')
})