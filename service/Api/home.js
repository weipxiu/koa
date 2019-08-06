const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()

router.get('/', function (ctx, next) {
  ctx.body = {
    mongodb: '这是首页'
  }
});

router.post('/register',async(ctx)=>{
   
  const User = mongoose.model('User')
  let newUser = new User(ctx.request.body)

  await newUser.save().then(()=>{
      ctx.body={
          code:200,
          message:'注册成功'
      }
  }).catch(error=>{
      ctx.body={
          code:500,
          message:error
      }
  })
})

router.post('/login',async(ctx)=>{
  let loginUser = ctx.request.body
  console.log(loginUser)
  let userName = loginUser.userName
  let password = loginUser.password

  //引入User的model
  const User = mongoose.model('User')

  await User.findOne({userName:userName}).exec().then(async(result)=>{
      console.log(result)
      if(result){
          let newUser = new User()
          await newUser.comparePassword(password,result.password)
          .then(isMatch=>{
              ctx.body={code:200,message:isMatch}
          })
          .catch(error=>{
              console.log(error)
              ctx.body={code:500,message:error}
          })
      }else{
          ctx.body={code:200,message:'用户名不存在'}
      }
  }).catch(error=>{
      console.log(error)
      ctx.body={code:500,message:error}
  })

})

// router.get('/login', async (ctx) => {
//   try {
//     const User = mongoose.model('User')
//     let result = await User.findById('5d2da91b76accfce15fdfbfe').exec();
//     //console.log(option)
//     ctx.body = { code: 200, data: result }
//   } catch (error) {
//     ctx.body = { code: 500, message: error }
//   }
// })

router.get('/a/:aaa', function (ctx, next) {
  // query：拿到的是get请求的对象
  // querystring：拿到的是get请求的字符串
  // params：拿到的是get动态路由参数
  // request：拿到所有地址参数
  // ctx.request.body 拿到post请求参数对象

  //console.log(ctx.query)//拿到的是参数对象 路由：http://localhost:3000/news?s=0
  //console.log(ctx.querystring)//拿到的是参数字符串 路由：http://localhost:3000/news?s=0 "querystring": "abc=123456789"
  //console.log(ctx.params) //路由：http://localhost:3000/news/123,params必须是用于动态路由
  //console.log(ctx.request)//可以拿到所有地址参数
  ctx.body = {
    code: 200,
    query: ctx.query,
    querystring: ctx.querystring,
    params: ctx.params,
    request: ctx.request
  }
});

router.get('/b', function (ctx, next) {

  ctx.body = {
    code: 200,
    query: ctx.query,
    querystring: ctx.querystring,
    params: ctx.params,
    request: ctx.request
  }
});


router.post('/signin', function (ctx, next) {
  ctx.body = {
    code: 200,
    query: ctx.query,
    querystring: ctx.querystring,
    params: ctx.params,
    request: ctx.request,
    postParam: ctx.request.body //post请求参数获取
  }
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