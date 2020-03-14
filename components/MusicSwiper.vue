<template>
  <v-card>
    <v-card-title v-if="title"
      >{{ title ? title : '' }}
      <v-spacer></v-spacer>
      <v-btn v-if="link" x-small @click="$router.push(link)" text
        >See More</v-btn
      >
    </v-card-title>
    <v-card-text>
      <div v-swiper:albumsSwiper="albums_swiper_option">
        <div class="swiper-wrapper">
          <div v-for="(item, index) in data.data" class="swiper-slide">
            <v-card
              @click="$router.push('music')"
              class="fill-height"
              flat
              tile
            >
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
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<style lang="scss" scoped>
.swiper-container {
  width: 100%;
  padding: 5px;
}
</style>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    data: {
      default: []
    },
    link: {
      type: String,
      default: ''
    }
  },
  name: 'MySwiper',
  data() {
    return {
      albums_swiper_option: {
        slidesPerView: 2,
        spaceBetween: 1,
        navigate: true,
        centeredSlides: false,
        clickable: true,
        breakpoints: {
          1024: {
            slidesPerView: 3,
            spaceBetween: 10
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 10
          },
          320: {
            slidesPerView: 3,
            spaceBetween: 10
          }
        }
      }
    }
  },
  methods: {
    bgClass(id) {
      return {
        backgroundImage: this.data[id].url
      }
    }
  }
}
</script>
