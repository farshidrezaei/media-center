<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <movie-swiper
          :data="data"
          title="Newest Movies"
          link="movies-collection"
        ></movie-swiper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MovieSwiper from '../components/MovieSwiper'

export default {
  components: { MovieSwiper },
  layout: 'app',

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
