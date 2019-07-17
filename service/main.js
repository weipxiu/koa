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


app.use(cors()); //跨域
app.use(bodyParser()); //由于middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上

//引入路由
let home = require('./Api/home.js');
// 挂载路由
let router = new Router()
//router.use('/home',home.routes()); //注意routes
router.use('',home.routes()); //注意routes


app.use(router.routes()); //启动路由
app.use(router.allowedMethods()); //根据ctx.status设置response响应头

app.listen(3000, () => {
    console.log('监听8080端口')
});
