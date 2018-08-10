const Koa = require('koa');
const router = require('koa-router')(); //注意：引入的方式
const app = new Koa();//实例化

router.get('/', function (ctx, next) {
    ctx.body = "你好啊koa！";
})
router.get('/news/:aaa',function (ctx,next){
    //获取动态路由
    //console.log(ctx.query)//拿到的是参数对象 路由：http://localhost:3000/news?s=0
    //console.log(ctx.querystring)//拿到的是参数字符串 路由：http://localhost:3000/news?s=0
    console.log(ctx.params) //路由：http://localhost:3000/news/123,params必须是用于动态路由
    //console.log(ctx.request)//可以拿到所有地址参数
    ctx.body = "新闻 page"
});


app.use(router.routes()); //作用：启动路由
app.use(router.allowedMethods()); 
// 作用： 上面这是官方文档的推荐用法,我们可以看到 router.allowedMethods() 用在了路由匹配 router.routes() 之后, 所以在当所有路由中间件最后调用.此时根据 ctx.status 设置 response 响应头

app.listen(3000, () => {
    console.log('starting at port 3000');
});