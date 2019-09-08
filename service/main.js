const Koa = require('koa');
const app = new Koa();//实例化
const Router = require('koa-router'); //注意：引入的方式
const bodyParser = require('koa-bodyparser');//处理post请求
const cors = require('koa2-cors');// CORS是一个W3C标准，全称是"跨域资源共享"
const { connect, initSchemas } = require("./mongodb");
const mongoose = require('mongoose');

// const server = require('http').Server(app); //这么写mac电脑会有问题，无法访问
const server = require('http').Server(app.callback());

const io = require('socket.io')(server);
const port = 3000;

//连接数据库
(async () => {
    await connect() //连接mongodb数据库
    initSchemas() //数据库模型schema
})()
// connect()

//匹配所有路由
app.use(async (ctx, next) => {
    //aaconsole.log('匹配所有路由')
    await next();
    if (ctx.status == 404) {
        ctx.body = {
            status: 404,
            msg: '当前没有匹配到任何路由，返回404',
            request: ctx.request
        }
    } else {
        //console.log(ctx.request)
    }
})

//app.use(cors()); //全部允许跨域
app.use(
    cors({
        origin: function (ctx) { //设置允许来自指定域名请求
            const whiteList = ['http://weipxiu.com', 'http://localhost:8081'];
            let url = ctx.header.referer && ctx.header.referer.substr(0, ctx.header.referer.length - 1)
            if (whiteList.includes(url)) {
                return url
            }
            return 'http://localhost:3000'
        },
        maxAge: 5, //指定本次预检请求的有效期，单位为秒。
        credentials: true, //是否允许发送Cookie
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
    })
);
app.use(bodyParser()); //这个koa-bodyparser必须在router之前被注册到app对象上

//引入路由
let home = require('./Api/home.js');
let details = require('./Api/details.js');

// 挂载路由
let router = new Router()
router.use('/home', home.routes()); //第一个参数/home就是路由前缀，相当于说访问home模块路由必须以/api去访问，模块化管理，可以设置为空
router.use('/details', details.routes());

app.use(router.routes()); //启动路由
app.use(router.allowedMethods()); //可根据ctx.status设置response响应头

// app.listen(3000, () => {
//     console.log('监听3000端口')
// });

//获取用户ip地址
// function getIPAddress(){
//     var interfaces = require('os').networkInterfaces(); 
//     for(var devName in interfaces){
//       var iface = interfaces[devName];
//       for(var i=0;i<iface.length;i++){
//         var alias = iface[i];
//         if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
//           return alias.address;
//         }
//       }
//     }
//   }

let sum = 0;
io.on('connection', socket => {
    console.log('初始化成功！');
    const Message = mongoose.model('Message')
    Message.find({}, function (err, res) {
        io.emit('getMsg', res);
    })
    //新人进来在线人数+1
    socket.on('users',data=>{
        sum = sum + 1;
        io.emit('users',sum); //将消息发送给所有人。
    })
    //disconnnect断开,自带函数方法
    socket.on('disconnect',data=>{
        console.log('用户断开了');
        if(sum > 0)sum = sum - 1;
        io.emit('users',sum); //将消息发送给所有人。
    })
    socket.on('send', data => {
        // console.log('客户端发送的内容：',data, data['name'], data['getMsg']);
        try {
            const Message = mongoose.model('Message')
            let oneUser = new Message({ name: data['name'], msg: data['getMsg'] })
            oneUser.save().then(() => {
                const Message = mongoose.model('Message')
                let dataArry = Message.find({}, function (err, res) {
                    console.log('获取到数据', res)
                    socket.emit('getMsg', res); //通知触发该方法的客户端
                    io.emit('getMsg', res); //通知所有客户端
                })
            })
        } catch (error) {
            console.log("失败",error)
        }
    })
})

server.listen(port, () => {
    console.log(`监听地址: http://127.0.0.1:${port}`);
})