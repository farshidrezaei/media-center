<template>
  <v-app class="fill-height">
    <!--    <notifications group="all" position="bottom center"></notifications>-->
    <nuxt />
  </v-app>
</template>

<script>
export default {
  data() {
    return {}
  },
  auth: 'guest',
  middleware: 'not-auth'
}
</script>
