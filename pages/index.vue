<template>
  <v-layout column justify-center align-center>
    <v-card class="elevation-12"  min-width="400" color="">
      <v-toolbar color="blue" flat>
        <v-toolbar-title class="headline">
          Nuxt chat
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="name"
            :counter="16"
            :rules="nameRules"
            label="Ваше имя"
            required
            color="blue"
          ></v-text-field>

          <v-text-field
            v-model="room"
            :rules="roomRules"
            label="Введите комнату"
            required
            color="blue"
          ></v-text-field>

          <v-btn :disabled="!valid" color="blue" class="mt-5" @click="submit">
            Войти
          </v-btn>

        </v-form>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'LoginPage',
  layout: "empty",
  head: {
    title: 'Добро пожаловать в Nuxt чат'
  },
  sockets: {
    connect() {
      console.log("client io connected");
    }
  },
  data: () => ({
    valid: true,
    name: "",
    room: "",

    nameRules: [
      v => !!v || "Введите имя",
      v => (v && v.length <= 16) || "Имя не должно превышать 16 символов"
    ],
    roomRules: [v => !!v || "Введите комнату"]
  }),

  methods: {
    ...mapMutations(['setUser']),
    submit() {
      if (this.$refs.form.validate()) {
        const user = {
          name: this.name,
          room: this.room,
        }

        // получаем уникальный id
        this.$socket.emit('userJoined',user, () => {

        });

        this.setUser(user);
        this.$router.push('/chat')
      }
    },
  }
};
</script>
