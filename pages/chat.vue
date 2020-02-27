<template>
  <div class="chat-wrap">
    <div class="chat" ref="block">
      <Message v-for="(m, i) in messages" :key="i"
      :name="m.name" :text="m.text"
      :owner="m.id === user.id"/>
    </div>
    <div class="chat-form">
      <ChatForm/>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Message from '@/components/Message.vue'
import ChatForm from '@/components/ChatForm.vue'

export default {
  name: 'ChatPage',
  middleware: ['chat'],
  components: {
    Message,ChatForm
  },
  head() {
    return {
      title: `Комната ${this.user.room}`

    }
  },
  computed: {
    ...mapState(['user','messages']),
  },
  watch: {
    messages(){
      setTimeout(() => {
        this.$refs.block.scrollTop = this.$refs.block.scrollHeight;
      });
    }
  },
}
</script>

<style scoped>
.chat-wrap{
  height: 100%;
  position: relative;
  overflow: hidden;
}
.chat-form{
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  padding: 1rem;
  height: 80px;
  background-color: #212121;
}
.chat{
  position: absolute;
  bottom: 80px;
  left: 0px;
  right: 0px;
  top: 0px;
  padding: 1rem;
  overflow-y: auto;
}
</style>
