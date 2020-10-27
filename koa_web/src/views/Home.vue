<template>
  <div class="home">
    <group-chat />
  </div>
</template>

<script>
import groupChat from '@/components/group-chat.vue'

export default {
  name: 'home',
  components: {
    groupChat
  }
}
</script>
