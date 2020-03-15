<template>
  <v-app>
    <v-app-bar app fixed>
      <v-btn icon @click="back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-toolbar-title><small></small></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<style lang="scss" scoped></style>

<script>
export default {
  name: 'Collection',
  middleware: 'auth',
  data() {
    return {}
  },
  created() {},
  methods: {
    back() {
      if (window.history.length > 2) this.$router.back()
      else this.$router.push('/')
    }
  }
}
</script>
