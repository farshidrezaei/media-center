<template>
  <div>
    <v-app-bar app fixed>
      <v-btn icon @click="back">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-toolbar-title
        ><small>{{ title }}</small></v-toolbar-title
      >

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-view-module</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-music-player
        :data="tracks"
        with-title
        with-change-controls
        with-cover
        with-like
        with-seek-bar
        with-shuffle
        with-volume
        with-repeat
        repeat-on
        shuffle-on
      ></v-music-player>
    </v-content>
  </div>
</template>

<style lang="scss">
.w-100 {
  width: 100% !important;
}

.text--x-small {
  font-size: x-small;
}

.text--small {
  font-size: small;
  font-weight: 300;
}

.text--justify {
  text-align: justify;
  word-wrap: break-spaces;
}

.lyric {
  padding: 1em;
}

.v-input__append-outer {
  align-self: flex-end !important;
}

.v-input__prepend-inner {
  align-self: flex-start !important;
}
</style>

<script>
import VMusicPlayer from '../components/VMusicPlayer/VMusicPlayer'
export default {
  layout: 'single',
  components: { VMusicPlayer },
  data() {
    return {
      title: 'Eminem - Rap god',
      tab: null,
      comment: '',
      replyTo: '',
      tracks: [
        {
          ogg:
            'https://matthiashager.com/cc0-music/Brad_Sucks_-_07_-_Total_Breakdown.mp3',
          mp3_320:
            'https://matthiashager.com/cc0-music/Brad_Sucks_-_07_-_Total_Breakdown.mp3',
          mp3_128:
            'https://matthiashager.com/cc0-music/Brad_Sucks_-_07_-_Total_Breakdown.mp3',
          title: 'Total Breakdown',
          artist: 'Brad Sucks',
          cover: `https://picsum.photos/601`
        },
        {
          ogg:
            'https://matthiashager.com/cc0-music/Carb_On_Carb_-_01_-_Smash.mp3',
          mp3_320:
            'https://matthiashager.com/cc0-music/Carb_On_Carb_-_01_-_Smash.mp3',
          mp3_128:
            'https://matthiashager.com/cc0-music/Carb_On_Carb_-_01_-_Smash.mp3',
          title: 'Smash',
          artist: 'Carb on Carb',
          cover: `https://picsum.photos/602`
        },
        {
          ogg:
            'https://matthiashager.com/cc0-music/Choc_-_01_-_Eigenvalue_Subspace_Decomposition.mp3',
          mp3_320:
            'https://matthiashager.com/cc0-music/Choc_-_01_-_Eigenvalue_Subspace_Decomposition.mp3',
          mp3_128:
            'https://matthiashager.com/cc0-music/Choc_-_01_-_Eigenvalue_Subspace_Decomposition.mp3',
          title: 'Eigenvalue Subspace Decomposition',
          artist: 'Choc',
          cover: `https://picsum.photos/603`
        },
        {
          ogg:
            'https://matthiashager.com/cc0-music/Paper_Navy_-_08_-_Swan_Song.mp3',
          mp3_320:
            'https://matthiashager.com/cc0-music/Paper_Navy_-_08_-_Swan_Song.mp3',
          mp3_128:
            'https://matthiashager.com/cc0-music/Paper_Navy_-_08_-_Swan_Song.mp3',
          title: 'Swan Song',
          artist: 'Paper Navy',
          cover: `https://picsum.photos/604`
        },
        {
          ogg:
            'https://matthiashager.com/cc0-music/Sean_Fournier_-_06_-_Falling_For_You_Piano_Version.mp3',
          mp3_320:
            'https://matthiashager.com/cc0-music/Sean_Fournier_-_06_-_Falling_For_You_Piano_Version.mp3',
          mp3_128:
            'https://matthiashager.com/cc0-music/Sean_Fournier_-_06_-_Falling_For_You_Piano_Version.mp3',
          title: 'Falling for You Piano Version',
          artist: 'Sean Fournier',
          cover: `https://picsum.photos/605`
        },
        {
          ogg:
            'https://matthiashager.com/cc0-music/Carb_On_Carb_-_03_-_Practising_for_Retirement.mp3',
          mp3_320:
            'https://matthiashager.com/cc0-music/Carb_On_Carb_-_03_-_Practising_for_Retirement.mp3',
          mp3_128:
            'https://matthiashager.com/cc0-music/Carb_On_Carb_-_03_-_Practising_for_Retirement.mp3',
          title: 'Practising for Retirement',
          artist: 'Carb on Carb',
          cover: `https://picsum.photos/606`
        }
      ]
    }
  },
  methods: {
    back() {
      if (window.history.length > 2) this.$router.back()
      else this.$router.push('/')
    }
  }
}
</script>
