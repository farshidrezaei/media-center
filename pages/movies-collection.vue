<template>
  <v-container fluid>
    <v-sheet>
      <!-- summary -->
      <v-row>
        <!-- details -->
        <v-col
          v-for="(item, index) in data.data"
          :key="`movie-${index}`"
          cols="4"
          class="d-flex pa-2 align-center"
        >
          <v-card class="fill-height" flat tile @click="$router.push('movie')">
            <v-img :src="item.avatar"></v-img>

            <p class="text-center caption ma-0">{{ item.first_name }}</p>
            <p class="text-center caption ma-0">
              <small>{{ item.last_name }}</small>
            </p>
            <p class="text-center caption ma-0">
              <small
                >2,500
                <v-icon x-small>mdi-eye</v-icon>
              </small>
            </p>
            <p class="text-center caption ma-0">
              <small>
                0
                <v-icon x-small>mdi-heart</v-icon>
                1
                <v-icon x-small>mdi-comment</v-icon>
              </small>
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  layout: 'collection',

  async asyncData({ $axios }) {
    return {
      data: await $axios
        .$get('https://reqres.in/api/users?page=2')
        // eslint-disable-next-line no-console
        .catch((e) => console.log(e))
    }
  },

  data() {
    return {
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4'
      ],
      slides: ['First', 'Second', 'Third', 'Fourth', 'Fifth']
    }
  }
}
</script>
