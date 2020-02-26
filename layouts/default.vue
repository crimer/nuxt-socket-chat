<template>
  <v-app id="inspire">

    <v-navigation-drawer v-model="drawer" app clipped >
      <v-list subheader>
        <v-subheader>Пользователи в чате</v-subheader>
        <v-list-item v-for="user in users" :key="user.id">
          <v-list-item-content>
            <v-list-item-title v-text="user.name"/>
          </v-list-item-content>
          <v-list-item-icon>
          <v-icon :color="user.id == 2 ? 'blue' : 'grey'">mdi-message</v-icon>
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
      <div class="">
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
      users: [
        { id: 1, name: 'user 1' },
        { id: 2, name: 'user 2' },
        { id: 3, name: 'user 3' },
        { id: 4, name: 'user 4' },
      ],
    };
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    ...mapMutations(['clearData']),
    exit() {
      this.$router.push('/?message=leftChat')
      this.clearData()
    }
  }
};
</script>
