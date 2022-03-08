<template>
  <div class="home">
    <group-chat />
  </div>
</template>

<script>
import groupChat from '@/components/group-chat.vue'

export default {
  name: 'Home',
  components: {
    groupChat
  }
}
</script>
