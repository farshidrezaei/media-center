<template>
  <v-container>
    <v-card class="h-100">
      <v-card-text>
        <component :is="errorPage" :error="error" />
        <v-btn link to="/" small color="primary">Back to Home</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import error404 from '~/components/Errors/404.vue'
import error500 from '~/components/Errors/500.vue'
export default {
  name: 'NuxtError',
  layout: 'default', // optional
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    errorPage() {
      if (this.error.statusCode === 404) {
        return error404
      }
      // catch everything else
      return error500
    }
  }
}
</script>
