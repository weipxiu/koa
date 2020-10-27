const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()

router.get('/', function (ctx, next) {
  ctx.body = {
    mongodb: '这是首页'
  }
});

router.post('/register', async (ctx) => {

  const User = mongoose.model('User')
  let newUser = new User(ctx.request.body)
  console.log(ctx.request.body, newUser)

  await newUser.save().then(() => {
    ctx.body = {
      code: 200,
      message: '注册成功'
    }
  }).catch(error => {
    ctx.body = {
      code: 500,
      message: error
    }
  })
})

router.post('/login', async (ctx) => {
  let loginUser = ctx.request.body
  console.log(loginUser)
  let userName = loginUser.userName
  let password = loginUser.password

  //引入User的model
  const User = mongoose.model('User')
  await User.findOne({ userName: userName }).exec().then(async (result) => {
    console.log(result)
    if (result) {
      let newUser = new User()
      await newUser.comparePassword(password, result.password)
        .then(isMatch => {
          ctx.body = { code: 200, message: isMatch }
        })
        .catch(error => {
          console.log(error)
          ctx.body = { code: 500, message: error }
        })
    } else {
      ctx.body = { code: 200, message: '用户名不存在' }
    }
  }).catch(error => {
    console.log(error)
    ctx.body = { code: 500, message: error }
  })
})

router.get('/a/:aaa', function (ctx, next) {
  // 示例：http://localhost:3000/a?b=123
  // query：拿到的是get请求?后的参数对象{b=123}
  // querystring：拿到的是get请求?后的参数字符串"b=123"
  // params：拿到的是get动态路由参数{"aaa": "ceshi"}
  // request：拿到所有请求信息
  // ctx.request.body 拿到post请求参数对象，如果是get请求，拿到的是{}

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

// 设置皮肤
router.post('/setColor', async function (ctx, next) {
  try {
    const Color = mongoose.model('Color')
    // await Color.deleteMany({}) // 清空数据
    let newColor = new Color({ colorValue: ctx.request.body.colorValue })
    await newColor.save().then(() => {
      ctx.body = {
        code: 200,
        message: '颜色值设置成功'
      }
    })
  } catch (error) {
    ctx.body = { code: 500, message: error }
  }

});

// 获取皮肤颜色值
router.get('/getColor', async function (ctx, next) {
  try {
    const Color = mongoose.model('Color')
    await Color.find({}, function (err, res) {
      ctx.body = {
        code: 200,
        data: {
          value:res[0].colorValue
        }
      }
    }).sort({_id:-1}).limit(1); // sort根据_id字段进行倒叙返回，默认1
  } catch (error) {
    ctx.body = { code: 500, message: error }
  }

});

module.exports = router

//查多个表方法:$lookup,aggregate


