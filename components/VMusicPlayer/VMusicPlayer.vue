<template>
  <v-card class="overflow-hidden ma-2">
    <v-dialog
      v-if="withPlayList && !internalPlaylist"
      v-model="playlist"
      max-width="300"
      persistent
    >
      <v-card tile height="100%">
        <v-card-title class="d-flex">
          <span class="caption">PlayList</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="playlist = false">
            <v-icon small>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-list v-model="activeTrackIndex" dense>
          <v-list-item
            v-for="(track, index) in data"
            :key="track.title"
            dense
            :ripple="false"
            @click="loadTrack(index, true)"
          >
            <v-list-item-avatar
              size="25"
              :class="{
                pulse:
                  isPlaying &&
                  !$vuetify.theme.dark &&
                  activeTrackIndex === index,
                'pulse-dark':
                  isPlaying && $vuetify.theme.dark && activeTrackIndex === index
              }"
            >
              <v-img :src="track.cover || ''"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <span class="text--small">
                {{ track.title + ' - ' + track.artist }}
              </span>
            </v-list-item-content>
            <v-menu origin="center center" left transition="scale-transition">
              <template v-slot:activator="{ on }">
                <v-btn icon @click.stop="on">
                  <v-icon>mdi-dots-horizontal</v-icon>
                </v-btn>
              </template>
              <v-list dense>
                <v-list-item dense @click="loadTrack(index, true)">
                  <v-list-item-icon>
                    <v-icon>mdi-play</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <span class="text--small">Play</span>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  v-if="track.mp3_128"
                  :disabled="!track.mp3_128"
                  :href="track.mp3_128"
                  dense
                >
                  <v-list-item-icon>
                    <v-icon>mdi-file-music</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <span class="text--small">Download 128</span>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  v-if="track.mp3_320"
                  :disabled="!track.mp3_320"
                  :href="track.mp3_320"
                  dense
                >
                  <v-list-item-icon>
                    <v-icon>mdi-file-music</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <span class="text--small">Download 320</span>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item v-if="track.lyric" dense @click="showLyric(index)">
                  <v-list-item-icon>
                    <v-icon>mdi-text</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <span class="text--small">Lyric</span>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item>
        </v-list>
        <v-dialog v-model="lyric_dialog" width="500">
          <v-card>
            <v-card-title primary-title class="d-flex">
              <p class="ma-0 text--small">
                Lyric of "{{ data[lyric_index].title }}"
              </p>
              <v-spacer></v-spacer>
              <v-btn icon @click="lyric_dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>

            <v-card-text>
              <span class="text--justify">
                {{ data[lyric_index].lyric }}
              </span>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-card>
    </v-dialog>
    <v-navigation-drawer
      v-if="withPlayList && internalPlaylist"
      v-model="playlist"
      bottom
      absolute
      temporary
      right
      floating
    >
      <v-card tile height="100%">
        <v-card-title class="d-flex">
          <span class="caption">PlayList</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="playlist = false">
            <v-icon small>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-list v-model="activeTrackIndex" dense>
          <v-list-item
            v-for="(track, index) in data"
            :key="track.title"
            dense
            :ripple="false"
            @click="loadTrack(index, true)"
          >
            <v-list-item-avatar
              size="25"
              :class="{
                pulse:
                  isPlaying &&
                  !$vuetify.theme.dark &&
                  activeTrackIndex === index,
                'pulse-dark':
                  isPlaying && $vuetify.theme.dark && activeTrackIndex === index
              }"
            >
              <v-img :src="track.cover || ''"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <span class="text--small">
                {{ track.title + ' - ' + track.artist }}
              </span>
            </v-list-item-content>
            <v-menu origin="center center" left transition="scale-transition">
              <template v-slot:activator="{ on }">
                <v-btn icon @click.stop="on">
                  <v-icon>mdi-dots-horizontal</v-icon>
                </v-btn>
              </template>
              <v-list dense>
                <v-list-item dense @click="loadTrack(index, true)">
                  <v-list-item-icon>
                    <v-icon>mdi-play</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <span class="text--small">Play</span>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  v-if="track.mp3_128"
                  :disabled="!track.mp3_128"
                  :href="track.mp3_128"
                  dense
                >
                  <v-list-item-icon>
                    <v-icon>mdi-file-music</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <span class="text--small">Download 128</span>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  v-if="track.mp3_320"
                  :disabled="!track.mp3_320"
                  :href="track.mp3_320"
                  dense
                >
                  <v-list-item-icon>
                    <v-icon>mdi-file-music</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <span class="text--small">Download 320</span>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item v-if="track.lyric" dense @click="showLyric(index)">
                  <v-list-item-icon>
                    <v-icon>mdi-text</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <span class="text--small">Lyric</span>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item>
        </v-list>
        <v-dialog v-model="lyric_dialog" width="500">
          <v-card>
            <v-card-title primary-title class="d-flex">
              <p class="ma-0 text--small">
                Lyric of "{{ data[lyric_index].title }}"
              </p>
              <v-spacer></v-spacer>
              <v-btn icon @click="lyric_dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>

            <v-card-text>
              <span class="text--justify">
                {{ data[lyric_index].lyric }}
              </span>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-card>
    </v-navigation-drawer>

    <div :class="{ 'background-blur': backgroundBlur }">
      <v-img
        v-if="withCover && hasData && cover"
        transition="fade-transition"
        :src="activeTrack.cover || ''"
        max-height="300"
      ></v-img>
    </div>
    <!-- player -->
    <v-container>
      <v-row>
        <v-col v-if="withTitle" cols="12" class="d-flex pa-0 px-2 align-center">
          <v-spacer></v-spacer>
          <v-btn
            v-if="withCover && !backgroundBlur"
            small
            icon
            @click="cover = !cover"
          >
            <v-icon small>mdi-image</v-icon>
          </v-btn>
          <span class="text--small">{{
            data.length ? activeTrack.title + ' - ' + activeTrack.artist : ''
          }}</span>
          <v-spacer></v-spacer>
        </v-col>
        <!-- seek-bar -->
        <v-col
          v-if="withSeekBar"
          cols="12"
          class="d-flex pa-0 px-2 align-center"
        >
          <span class="text--x-small">{{ currentTime }}</span>
          <v-slider
            v-model="progress"
            class="mb-0"
            hide-details
            dense
            background-color="gray"
            track-color="gray"
            color="gray"
            min="0"
            max="100"
            step="0.01"
            :disabled="!hasData || loading"
            @change="seek"
          ></v-slider>
          <span class="text--x-small">{{ prettyDuration }}</span>
        </v-col>
        <!-- controls -->
        <v-col cols="12" class="d-flex pa-1 align-center">
          <v-btn
            v-if="withRepeat"
            :disabled="!hasData"
            icon
            :color="repeatOn ? 'primary' : ''"
            @click="repeatOn = !repeatOn"
          >
            <v-icon small>mdi-repeat</v-icon>
          </v-btn>
          <v-btn
            v-if="withShuffle"
            :disabled="!hasData"
            icon
            :color="shuffleOn ? 'primary' : ''"
            @click="shuffleOn = !shuffleOn"
          >
            <v-icon small>mdi-shuffle</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            v-if="withChangeControls"
            :disabled="disableNextAndPrevious"
            icon
            @click="loadPreviousTrack"
          >
            <v-icon>mdi-skip-previous-circle-outline</v-icon>
          </v-btn>
          <v-btn
            :loading="loading"
            :disabled="loading || !hasData"
            large
            icon
            @click="toggleStatus"
          >
            <v-icon
              x-large
              v-text="
                `${
                  !isPlaying
                    ? 'mdi-play-circle-outline'
                    : 'mdi-pause-circle-outline'
                }`
              "
            ></v-icon>
          </v-btn>
          <v-btn
            v-if="withChangeControls"
            :disabled="disableNextAndPrevious"
            icon
            @click="loadNextTrack"
          >
            <v-icon>mdi-skip-next-circle-outline</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn v-if="withLike" :disabled="!hasData" icon>
            <v-icon small>mdi-heart-outline</v-icon>
          </v-btn>
          <v-btn v-if="withPlayList" icon @click="playlist = true">
            <v-icon small>mdi-view-list</v-icon>
          </v-btn>
        </v-col>
        <!-- details -->
        <v-col v-if="withDetails" cols="12" class="d-flex pa-1 align-center">
          <v-spacer></v-spacer>
          <v-icon small>mdi-calendar-check</v-icon>
          <span class="mr-3 text--x-small">1398/12/22 </span>

          <v-icon small>mdi-heart</v-icon>
          <span class="mr-3 text--x-small">52 </span>

          <v-icon small>mdi-eye</v-icon>
          <span class="text--x-small">1,420</span>
          <v-spacer></v-spacer>
        </v-col>
        <!-- volume -->
        <v-col
          v-if="withVolume"
          cols="12"
          class="d-flex pa-0 px-12 align-center"
        >
          <v-icon small>mdi-volume-medium</v-icon>
          <v-slider
            v-model="volume"
            :disabled="!hasData"
            hide-details
            :color="isMute ? 'gray' : 'white'"
            background-color="gray"
            track-color="gray"
          ></v-slider>
          <v-icon small>mdi-volume-high</v-icon>
        </v-col>
      </v-row>
    </v-container>

    <!-- tabs-windows -->
    <v-row v-if="0">
      <v-sheet>
        <v-container class="align-end">
          <v-textarea
            v-model="comment"
            hide-details
            placeholder="Type Comment... "
            dense
            auto-grow
            filled
            rows="1"
            class="text--small align-end"
          >
            <template v-slot:append-outer>
              <v-btn icon color="primary" :disabled="!comment">
                <v-icon>mdi-send</v-icon>
              </v-btn>
            </template>
            <template v-slot:prepend-inner>
              <v-chip v-if="replyTo" x-small close draggable>
                Reply to @ali
              </v-chip>
            </template>
          </v-textarea>
        </v-container>
      </v-sheet>
      <v-sheet>
        <v-list dense three-line>
          <v-list-item>
            <v-list-item-avatar>
              <v-img src="https://picsum.photos/200"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="d-flex">
                <div>
                  <p class="ma-0">Farshid Rezaei</p>
                  <v-icon x-small>mdi-calendar-check</v-icon>
                  <span class="text--x-small">1398/12/23</span>
                </div>
                <v-spacer></v-spacer>
                <v-btn x-small color="primary" outlined>Reply</v-btn>
              </v-list-item-title>
              <span class="text--small text--justify">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفا ده از طراحان گرافیک است. چاپگرها و متون بلدهایدی در شصت و
                سه در مورد استفاد ه قرار گیرد.
              </span>
              <v-divider></v-divider>

              <v-list dense three-line>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-img src="https://picsum.photos/200"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title class="d-flex">
                      <div>
                        <p class="ma-0">Farshid Rezaei</p>
                        <v-icon x-small>mdi-calendar-check</v-icon>
                        <span class="text--x-small">1398/12/23</span>
                      </div>
                    </v-list-item-title>
                    <span class="text--small text--justify"
                      >لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                      و با استفاده از طراحان گرافیک است. چاپگرها و متون بلدهایدی
                      در شصت و سه در مورد استفاده قرار گیرد.</span
                    >
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-img src="https://picsum.photos/200"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title class="d-flex">
                      <div>
                        <p class="ma-0">Farshid Rezaei</p>
                        <v-icon x-small>mdi-calendar-check</v-icon>
                        <span class="text--x-small">1398/12/23</span>
                      </div>
                    </v-list-item-title>
                    <span class="text--small text--justify">
                      Lorem ipsum dolor sit ame t, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      a liqua. Pellentesque habitant morbi tristique senectus et
                      netus.
                    </span>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-avatar>
              <v-img src="https://picsum.photos/200"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="d-flex">
                <div>
                  <p class="ma-0">Farshid Rezaei</p>
                  <v-icon x-small>mdi-calendar-check</v-icon>
                  <span class="text--x-small">1398/12/23</span>
                </div>
                <v-spacer></v-spacer>
                <v-btn x-small color="primary" outlined>Reply</v-btn>
              </v-list-item-title>
              <span class="text--small text--justify">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفا ده از طراحان گرافیک است. چاپگرها و متون بلدهایدی در شصت و
                سه در مورد استفاد ه قرار گیرد.
              </span>
              <v-divider></v-divider>

              <v-list dense three-line>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-img src="https://picsum.photos/200"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title class="d-flex">
                      <div>
                        <p class="ma-0">Farshid Rezaei</p>
                        <v-icon x-small>mdi-calendar-check</v-icon>
                        <span class="text--x-small">1398/12/23</span>
                      </div>
                    </v-list-item-title>
                    <span class="text--small text--justify"
                      >لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                      و با استفاده از طراحان گرافیک است. چاپگرها و متون بلدهایدی
                      در شصت و سه در مورد استفاده قرار گیرد.</span
                    >
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-img src="https://picsum.photos/200"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title class="d-flex">
                      <div>
                        <p class="ma-0">Farshid Rezaei</p>
                        <v-icon x-small>mdi-calendar-check</v-icon>
                        <span class="text--x-small">1398/12/23</span>
                      </div>
                    </v-list-item-title>
                    <span class="text--small text--justify">
                      Lorem ipsum dolor sit ame t, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      a liqua. Pellentesque habitant morbi tristique senectus et
                      netus.
                    </span>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-row>
  </v-card>
</template>

<script>
const STATUSES = {
  STOPPED: 0,
  PAUSED: 1,
  PLAYING: 2
}
export default {
  name: 'AudioPlayer',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    withCover: {
      type: Boolean,
      default: false
    },
    withTitle: {
      type: Boolean,
      default: false
    },
    withSeekBar: {
      type: Boolean,
      default: false
    },
    withChangeControls: {
      type: Boolean,
      default: false
    },
    withVolume: {
      type: Boolean,
      default: false
    },
    withRepeat: {
      type: Boolean,
      default: false
    },
    withShuffle: {
      type: Boolean,
      default: false
    },
    withLike: {
      type: Boolean,
      default: false
    },
    withPlayList: {
      type: Boolean,
      default: false
    },
    withComments: {
      type: Boolean,
      default: false
    },
    withDetails: {
      type: Boolean,
      default: false
    },
    internalPlaylist: {
      type: Boolean,
      default: false
    },
    backgroundBlur: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tab: null,
      comment: '',
      replyTo: '',

      loading: false,

      lyric_index: 0,
      lyric_dialog: false,
      cover: true,

      playlist: false,
      volume: 50,

      activeTrackIndex: 0,
      audioElement: null,
      status: STATUSES.STOPPED,

      duration: '0:00',
      currentTime: '0:00',

      progress: 0,

      showVolumeMenu: false,
      showTracksList: false,

      isMute: false,
      repeatOn: false,
      shuffleOn: false
    }
  },
  computed: {
    disableNextAndPrevious() {
      return this.data.length <= 1
    },
    isPaused() {
      return STATUSES.PAUSED === this.status
    },
    isPlaying() {
      return STATUSES.PLAYING === this.status
    },

    isStop() {
      return STATUSES.STOPPED === this.status
    },
    isTrackLoaded() {
      return this.activeTrackIndex !== null && this.audioElement !== null
    },
    prettyDuration() {
      if (!this.audioElement || !this.duration) return '0:00'
      return (
        Math.floor(this.audioElement.duration / 60) +
        ':' +
        Math.floor(this.audioElement.duration % 60)
      )
    },
    activeTrack() {
      if (this.data && this.data[this.activeTrackIndex])
        return this.data[this.activeTrackIndex]
      return 0
    },
    hasData() {
      return this.data.length > 0
    },
    dataCount() {
      return this.data.length
    }
  },
  watch: {
    volume() {
      this.isMute = false
      this.updateVolume()
    }
  },
  mounted() {
    if (this.data.length > 0) {
      this.loadTrack(this.activeTrackIndex, false)
    }
  },
  methods: {
    setStatus(status) {
      this.status = status
    },

    trackExist(index) {
      return index < this.data.length || index >= 0
    },

    setActiveTrackIndex(index = 0) {
      this.activeTrackIndex = index
    },

    resetOptions() {
      this.currentTime = '0:00'
      this.progress = 0
      this.duration = '00:00'
    },

    updateVolume() {
      if (this.audioElement) {
        if (this.isMute === true) this.audioElement.volume = 0
        else {
          this.audioElement.volume = Number(this.volume)
          if (Number(this.volume) === 0) this.isMute = true
        }
      }
    },

    async createTrack() {
      this.audioElement = await new Audio(this.data[this.activeTrackIndex].ogg)
      this.audioElement.addEventListener('ended', this.loadNextTrack)
      this.audioElement.addEventListener('timeupdate ', this.updateProgress)
      this.audioElement.addEventListener('durationchange', () => {
        this.duration = this.audioElement.duration
      })
      this.audioElement.ontimeupdate = this.updateProgress
      this.updateVolume()
    },

    toggleStatus() {
      if (!this.isTrackLoaded) {
        this.loadTrack(this.activeTrackIndex)
      }
      if (this.isPaused || this.isStop) {
        this.play()
        return
      }
      this.pause()
    },

    async loadTrack(index, autoplay = false) {
      this.loading = true
      if (this.isTrackLoaded) this.pause()

      if (!this.trackExist(index)) return false // we should probably do something when the track doesn't exist

      this.setActiveTrackIndex(index)

      this.resetOptions()

      await this.createTrack().finally(() => (this.loading = false))

      this.setStatus(STATUSES.STOPPED)

      if (autoplay) this.play()
      this.$emit('play', this.activeTrack)
    },

    loadNextTrack(autoplay = true) {
      this.activeTrackIndex = this.shuffleOn
        ? Math.floor(Math.random() * this.dataCount)
        : this.activeTrackIndex + 1

      if (this.activeTrackIndex >= this.dataCount) {
        this.activeTrackIndex = 0
        if (!this.shuffleOn) {
          if (!this.repeatOn) {
            this.status = STATUSES.STOPPED

            this.loadTrack(this.activeTrackIndex, false)
            this.pause()
            return
          }
        }
      }
      this.loadTrack(this.activeTrackIndex, autoplay)
    },
    loadPreviousTrack(autoplay = true) {
      this.activeTrackIndex = this.shuffleOn
        ? Math.floor(Math.random() * this.dataCount)
        : this.activeTrackIndex - 1

      if (this.activeTrackIndex < 0) {
        this.activeTrackIndex = this.dataCount - 1
        if (!this.shuffleOn) {
          if (!this.repeatOn) {
            this.status = STATUSES.STOPPED
            this.loadTrack(this.activeTrackIndex, false)
            this.pause()
            return
          }
        }
      }
      this.loadTrack(this.activeTrackIndex, autoplay)
    },

    play() {
      this.setStatus(STATUSES.PLAYING)
      this.loading = true
      this.audioElement
        .play()
        .catch(() => {
          this.$notify({
            group: 'all',
            type: 'success',
            text: 'Failed to play.'
          })
        })
        .finally(() => {
          this.loading = false
        })
    },
    pause() {
      this.setStatus(STATUSES.PAUSED)
      this.audioElement.pause()
    },
    updateProgress() {
      if (!this.audioElement || !this.audioElement.currentTime)
        return (this.progress = 0)
      this.progress =
        (this.audioElement.currentTime / this.audioElement.duration) * 100
      const currentTime = {
        minute: Math.floor(this.audioElement.currentTime / 60),
        second: Math.floor(this.audioElement.currentTime % 60)
      }
      this.currentTime =
        currentTime.minute +
        ':' +
        (currentTime.second > 9 ? currentTime.second : '0' + currentTime.second)
    },
    seek() {
      this.audioElement.currentTime =
        this.audioElement.duration * (this.progress / 100)
    },

    showLyric(index) {
      this.lyric_dialog = true
      this.lyric_index = index
    }
  }
}
</script>

<style>
#canvas {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

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

.pulse {
  animation: shadow-pulse 1s infinite;
  border-radius: 10em;
}

.pulse-dark {
  animation: shadow-pulse-dark 1s infinite;
  border-radius: 10em;
}

.background-blur {
  position: absolute;
  filter: blur(30px) opacity(0.4);
}

@keyframes shadow-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.2);
  }
  100% {
    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
  }
}

@keyframes shadow-pulse-dark {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
  }
  100% {
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
  }
}
</style>
