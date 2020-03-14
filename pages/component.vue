<template>
  <div>
    <v-app-bar app fixed>
      <v-toolbar-title><small>Music Player</small></v-toolbar-title>
    </v-app-bar>

    <v-container>
      <v-row>
        <v-col cols="12">
          <v-music-player
            :data="tracks"
            @play="onPlay($event)"
            @like="onLike($event)"
            with-title
            with-change-controls
            with-cover
            with-like
            with-seek-bar
            with-shuffle
            with-volume
            with-repeat
            with-play-list
            with-details
            with-comments
            repeat-on
            shuffle-on
            internal-playlist
          ></v-music-player>
        </v-col>
        <v-col cols="12">
          <v-music-player
            :data="tracks"
            @play="onPlay($event)"
            @like="onLike($event)"
            with-title
            with-change-controls
            with-cover
            with-like
            with-seek-bar
            with-shuffle
            with-volume
            with-repeat
            with-play-list
            with-details
            with-comments
            repeat-on
            shuffle-on
          ></v-music-player>
        </v-col>
        <v-col cols="12">
          <v-music-player
            :data="tracks"
            @play="onPlay($event)"
            @like="onLike($event)"
            with-title
            with-change-controls
            with-cover
            with-like
            with-seek-bar
            with-shuffle
            with-volume
            with-repeat
            with-play-list
            with-details
            with-comments
            repeat-on
            shuffle-on
            background-blur
          ></v-music-player>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss"></style>
<script>
import VMusicPlayer from '../components/VMusicPlayer/VMusicPlayer'

export default {
  components: { VMusicPlayer },
  layout: 'settings',

  data() {
    return {
      tracks: [
        {
          ogg:
            'https://dl.nex1music.ir/1398/12/20/Amin Asadi - Chejoori [128].mp3',
          mp3_320:
            'https://matthiashager.com/cc0-music/Brad_Sucks_-_07_-_Total_Breakdown.mp3',
          mp3_128:
            'https://matthiashager.com/cc0-music/Brad_Sucks_-_07_-_Total_Breakdown.mp3',
          title: 'Chejoori',
          artist: 'Amin Asadi',
          cover: `https://nex1music.ir/upload/2020-03-10/amin-asadi-chejoori-2020-03-10-19-37-59.jpg`,
          lyric: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua. Pellentesque habitant morbi tristique senectus et netus.`,
          comments: []
        },
        {
          ogg:
            'https://dl.nex1music.ir/1398/12/20/Ehsan Papi - Age Nabashi [128].mp3',
          mp3_320:
            'https://matthiashager.com/cc0-music/Carb_On_Carb_-_01_-_Smash.mp3',
          mp3_128:
            'https://matthiashager.com/cc0-music/Carb_On_Carb_-_01_-_Smash.mp3',
          title: 'Nabashi',
          artist: 'Ehsan Papi',
          cover: `https://nex1music.ir/upload/2020-03-10/ehsan-papi-age-nabashi-2020-03-10-19-35-27.jpg`,
          lyric: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua. Pellentesque habitant morbi tristique senectus et netus.`,
          comments: []
        }
      ]
    }
  },
  methods: {
    onPlay($event) {
      console.log($event)
    },
    onLike($event) {}
  }
}
</script>
