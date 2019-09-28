<template>
  <div class="content">
    <!-- <h1>{{ msg }}</h1> -->
    <h1>多人实时在线聊天</h1>
    <p class="user_number">当前在线人数：<span>{{userNmber}}</span></p>
    <el-row>
      <el-col :span="20">
        <div class="grid-content bg-purple">
          <el-input v-model="inValue" size="small" placeholder="请输入内容" @keyup.enter.native="btn_sbmit"></el-input>
        </div>
      </el-col>

      <el-col :span="4">
        <div class="grid-content bg-purple-light">
          <el-button type="primary" size="small" @click="btn_sbmit">发送</el-button>
        </div>
      </el-col>

      <!-- <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col> -->
    </el-row>


    <ul>
      <!-- 最新加入 -->
      <li v-if="newUser">有新人加入</li>
      <li v-for="(item,index) in speak" :key="index" :class="{active:item.name == userStorage}">
        <span>
          <font v-if="item.name == userStorage">:</font>
          {{item.name}}
          <font v-if="item.name != userStorage">:</font>
        </span>
        {{item.msg}}
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'HelloWorld',
    props: {
      msg: String
    },
    data() {
      return {
        speak: [], //聊天记录
        inValue: '', //当前输入信息
        userIp: '未知用户',
        userStorage: localStorage.getItem("userId"),
        newUser: false, //是否有新人加入
        userNmber: 0 //在线人数
      }
    },
    created() {
      fetch('http://172.18.30.90:3000/home/b')
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          //console.log(myJson);
        });
    },
    mounted() {
      this.$socket.emit('connect', 1);
      console.log(this.userStorage)
    },
    methods: {
      //提交向后端发送数据
      btn_sbmit() {
        if (!localStorage.getItem("userId")) {
          this.userIp = this.formatDateTime() + Math.random().toString(36).substr(2);
          this.speak.push({ 'name': this.userIp.substr(-5, 5), msg: this.inValue })
          this.$socket.emit("send", { name: '用户' + this.userIp.substr(-5, 5), getMsg: this.inValue })
          localStorage.setItem("userId", '用户' + this.userIp.substr(-5, 5));
          this.userStorage = localStorage.getItem("userId");
        } else {
          this.speak.push({ 'name': localStorage.getItem("userId"), msg: this.inValue })
          this.$socket.emit("send", { name: localStorage.getItem("userId"), getMsg: this.inValue })
        }
        this.inValue = ''
      },
      //生成id
      formatDateTime() {
        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        return y + m + d + h + minute + second;
      }
    },
    sockets: {
      connect(data) {
        if (data) {
          console.log('连接成功', data)
          this.$socket.emit("users")
        }
      },
      users(data) {
        console.log("在线人数", data)
        this.userNmber = data;
      },
      reconnect(data) {
        console.log('重新连接', data)
      },
      disconnecting(data) {
        console.log('socket已断开连接');
        this.$socket.emit("users")
      },
      //有新人加入
      // userinfoNumber(data){
      //   this.userNmber = true;
      // },
      getMsg(data) {
        console.log("后端传过来的消息", data)
        this.speak = data
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .content {
    width: 500px;
    height: 500px;
    margin: 0px auto;
    padding: 25px;
    overflow-y: auto;

    .user_number {
      font-size: 20px;

      span {
        color: #ed5bb5
      }
    }
  }

  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin: 10px;
    text-align: left;

    span {
      color: #333;
      display: inline-block;
      width: 90px;
      text-align: left;
      // text-align-last: left;
    }

    &.active {
      text-align: right;

      span {
        color: #42b983;
        float: right;
        text-align: right;
      }
    }
  }

  a {
    color: #42b983;
  }
</style>