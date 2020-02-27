<template>
  <v-app id="inspire">

    <v-navigation-drawer v-model="drawer" app clipped mobile-break-point="650">
      <v-list subheader>
        <v-subheader>Пользователи в чате</v-subheader>
        <v-list-item v-for="u in users" :key="u.id">
          <v-list-item-content>
            <v-list-item-title>{{ u.name }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
          <v-icon :color="u.id == user.id ? 'blue' : 'grey'">mdi-message</v-icon>
        </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="red" dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click="exit">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title class="mr-12 align-center">
        <span class="title">Чат комнаты {{ user.room }}</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <div style="height: 100%;">
        <nuxt />
      </div>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "DefaultLayout",
  data() {
    return {
      drawer: true,
    };
  },
  computed: {
    ...mapState(["user",'users'])
  },
  methods: {
    ...mapMutations(['clearData']),
    exit() {
      this.$socket.emit('userLeft', this.user.id);
      this.$router.push('/?message=leftChat')
      this.clearData()
    }
  }
};
</script>
