const mongoose = require('mongoose') //引入Mongoose
const Schema = mongoose.Schema //声明Schema
let ObjectId = Schema.Types.ObjectId //声明Object类型

const articleSchema = new Schema({
  id: {
    unique: true,
    type: String
  },
  title: String,
  time: {
    type: Date,
    unique: true,
    default: Date.now
  },
  SUB_ID: String,
  author: String,
  photoUrl: String,
  summary: String,
  thumbUp: Number,
  articleRead: Number,
  commentCount: Number,
  tag: String,
  thumbUpStatus: Boolean,
}, {
  collections: 'Article'
})

mongoose.model('Article', articleSchema)