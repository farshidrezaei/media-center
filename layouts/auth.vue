<template>
  <v-app class="fill-height">
    <client-only>
      <notifications group="all" position="bottom center">
        <template slot="body" slot-scope="props">
          <div
            :class="[
              {
                'vue-notification-dark': $vuetify.theme.dark,
                'vue-notification': !$vuetify.theme.dark
              },
              'd-flex',
              'n-' + props.item.type
            ]"
          >
            <v-icon dark large :color="getTypeColor(props.item.type)"
              >{{ getTypeIcon(props.item.type) }}
            </v-icon>
            <a class="title"> </a>
            <div>{{ props.item.text }}</div>
            <v-btn
              :dark="$vuetify.theme.dark"
              icon
              class="close"
              @click="props.close"
            >
              <v-icon small>mdi-close</v-icon>
            </v-btn>
          </div>
        </template>
      </notifications>
    </client-only>
    <nuxt />
  </v-app>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    getTypeColor(type) {
      switch (type) {
        case 'warn':
          return 'warning'
        case 'success':
          return 'success'
        case 'error':
          return 'red'
        default:
          return 'info'
      }
    },
    getTypeIcon(type) {
      switch (type) {
        case 'warn':
          return 'mdi-alert'
        case 'success':
          return 'mdi-checkbox-marked-circle'
        case 'error':
          return 'mdi-alert-octagon'
        default:
          return 'mdi-information'
      }
    }
  },
  auth: 'guest',
  middleware: 'not-auth'
}
</script>
