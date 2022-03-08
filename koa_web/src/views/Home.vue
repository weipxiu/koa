<template>
  <div class="home">
    <el-button type="primary" size="mini" @click="change">切换聊天模式</el-button>
    <component :is="currentView"/>
  </div>
</template>

<script>
import groupChat from '@/components/group-chat.vue'
import privateChat from '@/components/private-chat.vue'

export default {
  name: 'Home',
  components: {
    groupChat,
    privateChat
  },
  data: function() {
    return {
      type: 1
    };
  },
  computed: {
    currentView() {
      return this.type ? 'groupChat' : 'privateChat';
    }
  },
  methods: {
    change() {
      this.type = !this.type;
    }
  }
}
</script>
<style scoped lang="less">
  .home {
    margin: 100px 0;
  }
</style>
