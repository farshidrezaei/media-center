<template>
  <v-app>
    <nuxt />
  </v-app>
</template>

<style lang="scss" scoped></style>

<script>
export default {
  name: 'Single',
  middleware: 'auth',
  data() {
    return {}
  },
  created() {}
}
</script>
