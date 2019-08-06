const Koa = require('koa');
const app = new Koa();//实例化
const Router = require('koa-router'); //注意：引入的方式
const bodyParser = require('koa-bodyparser');//处理post请求
const cors = require('koa2-cors');// CORS是一个W3C标准，全称是"跨域资源共享"
const { connect, initSchemas } = require("./mongodb");

//连接数据库
(async () => {
    await connect() //连接mongodb数据库
    initSchemas() //数据库模型schema
})()
// connect()

//匹配所有路由
app.use(async (ctx, next) => {
    console.log('匹配所有路由')
    await next();
    if (ctx.status == 404) {
        ctx.body = {
            status: 404,
            msg: '当前没有匹配到任何路由，返回404',
            request:ctx.request
        }
    } else {
        console.log(ctx.url)
    }
})

app.use(cors()); //跨域
app.use(bodyParser()); //这个koa-bodyparser必须在router之前被注册到app对象上

//引入路由
let home = require('./Api/home.js');
let details = require('./Api/details.js');

// 挂载路由
let router = new Router()
router.use('/home',home.routes()); //第一个参数/home就是路由前缀，相当于说访问home模块路由必须以/api去访问，模块化管理，可以设置为空
router.use('/details',details.routes());

app.use(router.routes()); //启动路由
app.use(router.allowedMethods()); //可根据ctx.status设置response响应头

app.listen(3000, () => {
    console.log('监听3000端口')
});
