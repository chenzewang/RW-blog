const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
let router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')

const {
  resolve
} = require('path')


//导入文章   insertAllArtile
router.get('/insertAllArtile', async (ctx) => {
  fs.readFile(resolve(__dirname, './data/article.json'), 'utf8', (err, data) => {
    data = JSON.parse(data)
    let saveCount = 0
    const Article = mongoose.model('Article')
    data.map((value, index) => {
      let newArticle = new Article(value)
      newArticle.save().then(() => {
        saveCount++
        console.log(`成功,${saveCount}/${data.length}`)
      }).catch(error => {
        console.log('插入失败:' + error)
      })
    })
  })
  ctx.body = "开始导入数据"
})


////***获取所有文章 getAllArticle
router.get('/getAllArticle', async (ctx) => {
  try {
    const Article = mongoose.model('Article')
    let result = await Article.find({}).exec()
    ctx.body = {
      code: 200,
      data: result
    }
  } catch (err) {
    ctx.body = {
      code: 500,
      message: err
    }
  }
})

////***获取所有文章 分页 getArticlePage
// router.post('/getArticlePage', async (ctx) => {
//   try {
//     let page = ctx.request.body.page //当前页数
//     let num = 2
//     let start = (page - 1) * num

//     const Article = mongoose.model('Article')
//     // let result = await Article.find({}).skip(start).limit(num).exec()
//     // ctx.body = {
//     //   code: 200,
//     //   data: {
//     //     result: result,
//     //     count: count
//     //   }
//     // }
//   } catch (err) {
//     ctx.body = {
//       code: 500,
//       message: err
//     }
//   }
// })
////***获取所有文章 分页 getArticlePage

router.post('/getArticlePage', async (ctx) => {
  try {
    let page = ctx.request.body.page //当前页数
    let num = 2
    let start = (page - 1) * num

    const Article = mongoose.model('Article')
    let result = await Article.find({}).skip(start).limit(num).exec()
    let count = await Article.countDocuments().exec()

    ctx.body = {
      code: 200,
      data: {
        result: result,
        count: Math.ceil(count / num)
      }
    }
  } catch (err) {
    ctx.body = {
      code: 500,
      message: err
    }
  }
})



module.exports = router;