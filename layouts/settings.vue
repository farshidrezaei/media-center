<template>
  <v-app>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<style lang="scss" scoped></style>

<script>
export default {
  name: 'setting',
  middleware: 'is-auth',
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
