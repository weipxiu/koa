<template>
  <div class="home">
    <GroupChat/>
  </div>
</template>

<script>
// @ is an alias to /src
import GroupChat from '@/components/GroupChat.vue'

export default {
  name: 'home',
  components: {
    GroupChat
  }
}
</script>
