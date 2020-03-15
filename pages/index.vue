<template>
  <div class="">
    <v-carousel
      :cycle="true"
      height="150"
      :show-arrows="false"
      hide-delimiter-background
    >
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet :color="colors[i]" height="100%" tile>
          <v-row class="fill-height" align="center" justify="center">
            <div class="display-3">{{ slide }} Slide</div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <music-swiper
            :data="musics"
            title="Special"
            link="musics-collection"
          ></music-swiper>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MusicSwiper from '../components/MusicSwiper'
export default {
  components: { MusicSwiper },
  layout: 'app',
  async fetch({ store, error }) {
    try {
      await store.dispatch('musics/fetchMusics')
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.response.status)
      error({
        statusCode: 503,
        message: 'Unable to fetch Musics at this time. Please try again.'
      })
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
  },
  computed: mapState({
    musics: (state) => state.musics.musics
  })
}
</script>
