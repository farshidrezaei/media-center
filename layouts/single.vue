<template>
  <v-app>
    <nuxt />
  </v-app>
</template>

<style lang="scss" scoped></style>

<script>
export default {
  name: 'single',
  middleware: 'auth',
  created() {},
  data() {
    return {}
  }
}
</script>
