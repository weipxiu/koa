const Koa = require('koa');
const app = new Koa();//实例化
const router = require('koa-router')(); //注意：引入的方式
const bodyParser = require('koa-bodyparser');//处理post请求
const { connect,initSchemas } = require("./mongodb");
const mongoose = require('mongoose');


//连接数据库
;(async ()=>{
  await connect()
  initSchemas()
  const User = mongoose.model('User')
  let oneUser = new User({userName:'lijun1',password:'123456'})
  oneUser.save().then(()=>{
      console.log("插入成功")
  })
  //查询数据
  let user = await User.findOne({}).exec();
  console.log('获取到数据，欧耶',user)
})()
// connect()

// koa中间件
app.use(async (ctx, next) => { //匹配任何路由,如果不写next，那么匹配成功后不会再执行，也就是说如果不执行next，那么只会打印时间，但对应的内容不会展示
    console.log(new Date())
    await next();
    if (ctx.status == 404) {
        ctx.status = 404;
        ctx.body = "这是一个错误的404页面"
    } else {
        console.log(ctx.url)
    }
})

router.get('/', function (ctx, next) {
    ctx.body = "你好啊koa！";
})
router.get('/news/:aaa', function (ctx, next) {
    //获取动态路由
    console.log(ctx.query)//拿到的是参数对象 路由：http://localhost:3000/news?s=0
    //console.log(ctx.querystring)//拿到的是参数字符串 路由：http://localhost:3000/news?s=0
    //console.log(ctx.params) //路由：http://localhost:3000/news/123,params必须是用于动态路由
    //console.log(ctx.request)//可以拿到所有地址参数
    ctx.body = {
        a: 1
    }
});

router.post('/signin', function (ctx, next) {
    ctx.body = "我是post请求"
});


app.use(bodyParser()); //由于middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上
app.use(router.routes()); //作用：启动路由
//app.use(router.allowedMethods()); 
// 作用： 上面这是官方文档的推荐用法,我们可以看到 router.allowedMethods() 用在了路由匹配 router.routes() 之后, 所以在当所有路由中间件最后调用.此时根据 ctx.status 设置 response 响应头

app.listen(8080,()=>{
  console.log('监听8080端口')
});
