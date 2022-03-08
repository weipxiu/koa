# Nodejs+Koa2+Vue2.x+MongoDb 前后端全栈项目实战

## Koa

> Koa 是一个新的 web 框架，由 Express 幕后的原班人马打造， 致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。 通过利用 async 函数，Koa 帮你丢弃回调函数，并有力地增强错误处理。 Koa 并没有捆绑任何中间件， 而是提供了一套优雅的方法，帮助您快速而愉快地编写服务端应用程序。

## 相关技术栈

> 前端

1. [Node](https://nodejs.org/zh-cn/) Koa 依赖 node v7.6.0 或 ES2015及更高版本和 async 方法支持
2. [Koa2](http://es6.ruanyifeng.com) Koa -- 基于 Node.js 平台的下一代 web 开发框架(替代Express)
3. [MongoDB](https://www.mongodb.com/) 基于分布式文件存储的数据库

## 数据库连接方式

1. 下载mongodb，版本v3.6.13，其他版本自测，解压后在bin同目录下新建db文件夹
2. win连接(配置了环境变量)：mongod --dbpath=E:\personal\koa\koa_service\db --port=27017
3. mac连接(未配置环境变量)：sudo ./mongod --dbpath=/Users/lijun/Documents/mongodb-osx-x86_64-3.6.13/db --port=27017

<!-- mongod --dbpath=/www/wwwroot/koa/service/db --port=27017 -->
<!-- echo "/www/wwwroot/koa/service/mongodb --dbpath=/www/wwwroot/koa/service/mongodb/db –logpath=/www/wwwroot/koa/service/mongodb/logs –logappend  --auth -–port=27017" >> /etc/rc.local

/www/wwwroot/koa/service/mongodb/bin/mongod --/www/wwwroot/koa/service/mongodb/db --logpath=/www/wwwroot/koa/service/mongodb/logs --logappend  --port=27017 --fork

dbpath=/www/wwwroot/koa/service/mongodb/db
logpath=/www/wwwroot/koa/service/mongodb/logs
port=27017
fork=true -->

<!-- ./mongod -f mongodb.conf -->

### 如何启动？
```
$cd koa_web

$cd koa_service

$npm install

$npm npm run dev
```



