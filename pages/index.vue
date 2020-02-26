<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-btn @click="message">new message</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  sockets: {
    connect() {
      console.log("client io connected");
    }
  },
  methods: {
    message() {
      this.$socket.emit("createMessage", { text: "от никиты!!!" });
    }
  }
};
</script>
