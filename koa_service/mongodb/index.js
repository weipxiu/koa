//加载数据库模块
const mongoose = require('mongoose');
const glob = require('glob');
const {resolve} = require('path');

exports.initSchemas = () => {
  glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}

exports.connect = () => {
  //监听http请求
  mongoose.connect(
    "mongodb://localhost:27017/koa",
    function (err) {
      if (err) {
        console.log('数据库连接失败');
      } else {
        console.log('数据库连接成功');
      }
    }
  );
}
