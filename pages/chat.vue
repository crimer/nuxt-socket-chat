<template>
  <div class="">
    <ul>
      <li v-for="(m, i) in messages" :key="i">
        {{ m.text }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'ChatPage',
  middleware: ['chat'],
  head() {
    return {
      title: `Комната ${this.user.room}`

    }
  },
  computed: {
    ...mapState(['user','messages']),
  }
}
</script>

<style>

</style>
