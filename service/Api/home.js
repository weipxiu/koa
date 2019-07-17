const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()

router.get('/', function (ctx, next) {
  ctx.body = {
    mongodb: '这是首页'
  }
});

router.get('/login', async (ctx) => {
  try {
    const User = mongoose.model('User')
    let result = await User.findById('5d2da91b76accfce15fdfbfe').exec();
    //console.log(option)
    ctx.body = { code: 200, data: result }
  } catch (error) {
    ctx.body = { code: 500, message: error }
  }
})


// koa中间件
// app.use(async (ctx, next) => { //匹配任何路由,如果不写next，那么匹配成功后不会再执行，也就是说如果不执行next，那么只会打印时间，但对应的内容不会展示
//   console.log(new Date())
//   await next();
//   if (ctx.status == 404) {
//     ctx.status = 404;
//     ctx.body = "这是一个错误的404页面"
//   } else {
//     console.log(ctx.url)
//   }
// })

router.get('/news/:aaa', function (ctx, next) {
  //获取动态路由
  console.log(ctx.query)//拿到的是参数对象 路由：http://localhost:3000/news?s=0
  //console.log(ctx.querystring)//拿到的是参数字符串 路由：http://localhost:3000/news?s=0
  //console.log(ctx.params) //路由：http://localhost:3000/news/123,params必须是用于动态路由
  //console.log(ctx.request)//可以拿到所有地址参数
  ctx.body = {
    mongodb: 1
  }
});

router.post('/signin', function (ctx, next) {
  ctx.body = "我是post请求"
});

module.exports = router















//插入数据
// let oneUser = new User({ userName: 'lijun5', password: '123456' })
// oneUser.save().then(() => {
//     console.log("插入成功")
// })

//查询数据
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
// await User.findByIdAndUpdate('5d2da91b76accfce15fdfbfe', {userName:'奥妙全自动'}, function(err, res) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(res);
//     }
//   });