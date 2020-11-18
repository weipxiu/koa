<template>
  <div class="about">
    <h1 :style="{color:colorStyle}">快来和妲己玩耍吧~~</h1>
    当前设置颜色值为：{{colorStyle}}
  </div>
</template>
<script>
export default {
  name: 'skin',
  data() {
    return {
      colorStyle:'#333'
    }
  },
  created() {
    var that = this;
    fetch('http://127.0.0.1:3000/home/getColor')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data.data.value)
        that.colorStyle = data.data.value
      });
  }
}
</script>

