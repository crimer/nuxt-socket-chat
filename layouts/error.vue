<template>
  <v-app app>
    <v-content>
      <v-container fluid>
        <h1>Страница не найдена</h1>
        <nuxt-link to="/?message=noUser">На вход</nuxt-link>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "ErrorLayout",
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred"
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title
    };
  }
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
