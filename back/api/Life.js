const Koa = require('koa')
const Router = require('koa-router')
let router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')

const {
  resolve
} = require('path')


//导入生活文章   insertAllArtile
router.get('/insertAllLife', async (ctx) => {
  fs.readFile(resolve(__dirname, './data/life.json'), 'utf8', (err, data) => {
    data = JSON.parse(data)
    let saveCount = 0
    const Life = mongoose.model('Life')
    data.map((value, index) => {
      let newLife = new Life(value)
      newLife.save().then(() => {
        saveCount++
        console.log(`成功,${saveCount}/${data.length}`)
      }).catch(error => {
        console.log('插入失败:' + error)
      })
    })
  })
  ctx.body = "开始导入数据"
})

//从文件更新content   updataContent
router.get('/updataContent', async (ctx) => {
  fs.readFile(resolve(__dirname, './data/content.txt'), 'utf8', (err, data) => {
    // console.log(data);
    const Life = mongoose.model('Life')
    Life.update({
      id: 3
    }, {
      content: String(data)
    }, function (err, result) {
      console.log(err);
      console.log(result);
    })
  })
  ctx.body = "开始导入数据"
})

////***获取所有文章content getLifeContent
router.post('/getLifeContent', async (ctx) => {
  let id = ctx.request.body.id //当前页数
  try {
    const Life = mongoose.model('Life')
    let result = await Life.findOne({
      id: id
    }).exec()
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

////***获取所有文章 getAllArticle
router.get('/getAllLife', async (ctx) => {
  try {
    const Life = mongoose.model('Life')
    let result = await Life.find({}).exec()
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
router.post('/getLifePage', async (ctx) => {
  try {
    let page = ctx.request.body.page //当前页数
    let num = 2
    let start = (page - 1) * num

    const Life = mongoose.model('Life')
    let result = await Life.find({}).skip(start).limit(num).exec()
    let count = await Life.countDocuments().exec()

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