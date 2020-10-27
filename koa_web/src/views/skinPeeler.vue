<template>
  <div class="about">
    <h1>快来和妲己玩耍吧~</h1>
  </div>
</template>
<script>
export default {
  name: 'skinPeeler',
  data(){
    return {

    }
  },
  created() {
    fetch('http://127.0.0.1:3000/home/getColor')
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
      });
  },
}
</script>

