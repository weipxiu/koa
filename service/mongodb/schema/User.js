const mongoose = require('mongoose');
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

//创建UseerSchema
const UserSchema = new Schema({
  UserId: ObjectId,
  userName: { unique: true, type: String },
  password: String,
  createAt: { type: Date, default: Date.now() },
  lastLoginAt: { type: Date, default: Date.now() }
})

//发布模型
mongoose.model('User', UserSchema)