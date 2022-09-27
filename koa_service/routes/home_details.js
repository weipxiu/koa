const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()

router.get('/', function (ctx, next) {
  console.log(ctx.status)
  ctx.body = {
    mongodb: '这是详情页面'
  }
});

module.exports = router















//插入数据
// let oneUser = new User({ userName: 'lijun5', password: '123456' })
// oneUser.save().then(() => {
//     console.log("插入成功")
// })

//查询数据
// 参数查询规则
// find({$or:[{from_user:data.from_user}, {to_user:data.to_user}])) // 前后满足一个即可
// find({from_user: { $in: [from_user, to_user] }}) 查询某个字段可能有多个候选值
// find({ price: { $ne: 1.99, $exists: true } }) 条件是price不等于1.99并且price字段存在

//find和findOne
// 如果用findOne({ name: ”张三” })查询，返回的只会是第一个张三
// 如果用find({ name: ”张三” })查询的话，就会返回两个张三了

//   await User.update({userName:'小名同学'},{userName:'QQ糖果'},function(err, res){
//     console.log('获取到数据，欧耶',err,res)
//   });

//   await User.findById('5d2da91b76accfce15fdfbfe',function(err, res){
//     console.log('获取到数据，欧耶',err,res)
//   });

//findByIdAndUpdate更新数据
// await User.findByIdAndUpdate('5d2da91b76accfce15fdfbfe', {userName:'奥利给'}, function(err, res) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(res);
//     }
//   });

//查多个表方法:$lookup,aggregate
