const Router = require('koa-router')

//api
let router = new Router();

let user = require('./api/user.js')
router.use('/user', user.routes())

let goods = require('./api/goods.js')
router.use('/goods', goods.routes())

let article = require('./api/article.js')
router.use('/article', article.routes())

let life = require('./api/life.js')
router.use('/life', life.routes())

// console.log(router);


module.exports = router