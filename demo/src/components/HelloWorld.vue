<template>
  <div class="content">
    <!-- <h1>{{ msg }}</h1> -->
    <h1>多人实时在线聊天</h1>
    <input type="请输入内容" v-model="inValue" @keyup.enter="btn_sbmit">
    <input type="button" value="发送" @click="btn_sbmit">
    <ul>
      <li v-for="(item,index) in speak" :key="index" :class="{active:item.name == userStorage}"><span>{{item.name}}：</span>{{item.msg}}</li>
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
      speak:[],
      inValue:'',
      userIp:'未知用户',
      userStorage: localStorage.getItem("userId")
    }
  },
  created () {
      fetch('http://172.18.30.90:3000/home/b')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      //console.log(myJson);
    });
  },
  mounted () {
    this.$socket.emit('connect', 1);
    console.log(this.userStorage)
  },
  methods: {
    //提交向后端发送数据
    btn_sbmit() {
      if(!localStorage.getItem("userId")){
        this.userIp = this.formatDateTime() + Math.random().toString(36).substr(2);
        this.speak.push({'name':this.userIp.substr(-5, 5),msg:this.inValue})
        this.$socket.emit("send",{name:'用户'+this.userIp.substr(-5, 5), getMsg:this.inValue})
        localStorage.setItem("userId",'用户'+this.userIp.substr(-5, 5));
        this.userStorage = localStorage.getItem("userId");
      }else{
        this.speak.push({'name':localStorage.getItem("userId"),msg:this.inValue})
        this.$socket.emit("send",{name:localStorage.getItem("userId"), getMsg:this.inValue})
      }
      this.inValue = ''
    },
    //生成id
    formatDateTime(){
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
  sockets:{
    connect(data){
      if(data){
        //console.log('连接上connect',data)
        // this.userIp = wsocket._socket.remoteAddress;
        // getSocketServiceList().then(res=>{
        //   if(res.code){
        //     this.$socket.emit("a",{authCode:res.code})
        //   }
        // })
        // this.$socket.emit("send",{getMsg:"逗比逗比"})
        // this.speak.push({'name':'我',msg:"逗比逗比"})
      }
    },
    users(data){
      console.log("在线人数",data)
    },
    reconnect(data){
      console.log('重新连接',data)
    },
    disconnnect(){
      console.log('socket已断开连接')
    },
    getMsg(data){
      console.log("后端传过来的消息",data)
      this.speak = data
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.content{
  width:500px;
  height:500px;
  border:1px solid #eee;
  margin:50px auto;
  padding:25px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin:10px;
  text-align: left;
  span{
    color: #333;
    display: inline-block;
    width:100px;
    text-align: left;
    // text-align-last: left;
  }
  &.active{
    text-align: right;
    span{
      color: #42b983
    }
  }
}
a {
  color: #42b983;
}
</style>
