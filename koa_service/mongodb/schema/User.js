const mongoose = require('mongoose');
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

// Schema支持的键值类型有String，Number，Date，Buffer，Boolean，Array，Objectld，Mixed。Schema不仅定义document的模板，而且可以定义document的实例方法

//创建UseerSchema
const UserSchema = new Schema({
  UserId: ObjectId,
  userName: { unique: true, type: String }, //unique唯一
  password: String,
  createAt: { type: Date, default: Date.now() },
  lastLoginAt: { type: Date, default: Date.now() }
})

//加盐加密处理
UserSchema.pre('save', function(next){
  bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt)=>{
      if(err) return next(err)
      bcrypt.hash(this.password,salt,(err,hash)=>{
          if(err) return next(err)
          this.password = hash
          next()
      })
  })
})

UserSchema.methods={
  comparePassword:(_password,password)=>{
      return new Promise((resolve,reject)=>{
          bcrypt.compare(_password,password,(err,isMatch)=>{
              if(!err) resolve(isMatch)
              else reject(err)
          })
      })
  }
}

//发布模型
mongoose.model('User', UserSchema)