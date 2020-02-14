const mongoose = require('mongoose') //引入Mongoose
const Schema = mongoose.Schema //声明Schema
let ObjectId = Schema.Types.ObjectId //声明Object类型

const LifeSchema = new Schema({
  id: {
    unique: true,
    type: String
  },
  title: String,
  time: {
    type: Date,
    default: Date.now()
  },
  comment: String,
  author: String,
  photo: String,
  read: String,
  thumb: Number,
  content: String
}, {
  collections: 'Life'
})

mongoose.model('Life', LifeSchema)