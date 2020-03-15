<template>
  <div class="d-flex">
    <v-dialog
      v-model="show"
      persistent
      max-width="500"
      width="100%"
      style="height: auto"
    >
      <!-- camera -->
      <v-card width="100%">
        <div class="video-wrap">
          <div class="actions-wrap d-flex pa-2">
            <v-spacer></v-spacer>
            <v-btn
              v-if="image === ''"
              class="me-2"
              :disabled="cameras.length <= 1"
              icon
              @click="toggleCamera"
            >
              <v-icon class="action-color">{{ toggleCameraIcon }}</v-icon>
            </v-btn>
            <v-btn v-else class="me-2" icon @click="ok">
              <v-icon class="action-color">{{ okIcon }}</v-icon>
            </v-btn>

            <v-btn
              v-if="image === ''"
              class="me-2"
              :disabled="!status"
              icon
              @click="capture"
            >
              <v-icon large class="action-color">{{ captureIcon }}</v-icon>
            </v-btn>
            <v-btn v-else class="me-2" icon @click="retry">
              <v-icon large class="action-color">{{ retryIcon }}</v-icon>
            </v-btn>

            <v-btn icon @click="close">
              <v-icon class="action-color">{{ closeIcon }}</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
          </div>
          <video
            ref="video"
            :style="`display:${image !== '' ? 'none' : 'block'}`"
            class="video"
            :src="video"
            autoplay
          ></video>
          <v-img
            v-if="image !== ''"
            alt="image"
            class="video"
            :src="image"
            :lazy-src="image"
          ></v-img>
          <canvas ref="canvas" class="d-none"></canvas>
        </div>
      </v-card>
    </v-dialog>
    <!--    <v-btn class="justify-center align-center" @click="dialog=true">open</v-btn>-->
  </div>
</template>

<script>
export default {
  name: 'VCamera',
  model: {
    prop: 'show',
    event: 'toggleShow'
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    toggleCameraIcon: {
      type: String,
      default: 'mdi-camera-switch'
    },
    captureIcon: {
      type: String,
      default: 'mdi-camera-iris'
    },
    closeIcon: {
      type: String,
      default: 'mdi-close'
    },
    retryIcon: {
      type: String,
      default: 'mdi-reload'
    },
    okIcon: {
      type: String,
      default: 'mdi-check'
    }
  },
  data() {
    return {
      constraints: {
        video: {
          width: {
            min: 1280,
            ideal: 1920,
            max: 2560
          },
          height: {
            min: 720,
            ideal: 1080,
            max: 1440
          }
        }
      },
      camera: null,
      camera_index: null,
      cameras: [],
      stream_started: false,
      status: false,
      video: '',
      stream: null,
      image: '',
      blob: null
    }
  },
  watch: {
    show(newVal, oldVal) {
      if (newVal) {
        this.start()
      }
    }
  },
  mounted() {},
  methods: {
    async start() {
      await this.getCameras()
    },
    async play() {
      if (this.stream_started) {
        await this.$refs.video.play()
        this.status = true
      }
      if ('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia) {
        const updatedConstraints = {
          ...this.constraints,
          deviceId: {
            exact: this.camera
          }
        }
        this.startStream(updatedConstraints)
      }
    },
    async pause() {
      if (this.stream_started) {
        await this.$refs.video.pause()
        this.status = false
        await this.stopCamera()
      }
    },
    async capture() {
      this.$refs.canvas.width = this.$refs.video.videoWidth
      this.$refs.canvas.height = this.$refs.video.videoHeight
      this.$refs.canvas
        .getContext('2d')
        .drawImage(
          this.$refs.video,
          0,
          0,
          this.$refs.canvas.width,
          this.$refs.canvas.height
        )
      this.image = this.$refs.canvas.toDataURL('image/jpeg')
      this.blob = await this.base64ImageToBlob(this.image)
      this.pause()
      this.stopCamera()
    },
    async retry() {
      this.image = ''
      await this.play()
    },
    async close() {
      await this.pause()
      await this.stopCamera()
      await this.$emit('toggleShow', false)
      this.image = ''
      this.blob = null
    },
    async ok() {
      await this.$emit('captured', { blob: this.blob, image_url: this.image })
      await this.close()
    },

    async stopCamera() {
      this.status = false
      await this.$refs.video.srcObject
        .getVideoTracks()
        .forEach((track) => track.stop())
    },
    async startStream(constraints) {
      this.stream = await navigator.mediaDevices.getUserMedia(constraints)
      await this.handleStream(this.stream)
    },
    handleStream(stream) {
      this.$refs.video.srcObject = stream
      this.status = true
      this.stream_started = true
    },
    async getCameras() {
      const cameras = await navigator.mediaDevices.enumerateDevices()
      this.cameras = cameras.filter((camera) => camera.kind === 'videoinput')
      if (cameras.length) {
        this.camera = cameras[0]
        this.camera_index = 0
        this.play()
      }
    },
    async toggleCamera() {
      if (this.cameras.length > 1) {
        await this.pause()
        this.camera_index = this.camera_index === 1 ? 0 : 1
        this.camera = this.cameras[this.camera_index]
        await this.play()
      }
    },

    base64ImageToBlob(base64Image) {
      // Split the base64 string in data and contentType
      const block = base64Image.split(';')
      // Get the content type
      const contentType = block[0].split(':')[1] // In this case "image/gif"
      // get the real base64 content of the file
      const realData = block[1].split(',')[1] // In this case "iVBORw0KGg...."

      const sliceSize = 512

      const byteCharacters = atob(realData)
      const byteArrays = []

      for (
        let offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        const slice = byteCharacters.slice(offset, offset + sliceSize)

        const byteNumbers = new Array(slice.length)
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i)
        }

        const byteArray = new Uint8Array(byteNumbers)

        byteArrays.push(byteArray)
      }
      // eslint-disable-next-line no-console
      console.log('blob created')
      return new Blob(byteArrays, { type: contentType })
    }
  }
}
</script>

<style scoped>
.video-wrap {
  position: relative;
  display: flex;
  align-items: flex-end;
  width: 100%;
}

.actions-wrap {
  position: absolute;
  z-index: 2;
  width: 100%;
}

.action-color {
  color: rgba(255, 255, 255, 0.76) !important;
  caret-color: rgba(255, 255, 255, 0.76) !important;
}

.video {
  width: 100%;
  /*background: rgba(0, 0, 0, 0.2);*/
  z-index: 1;
  min-height: 10em;
  height: auto;
  border-radius: 5px;
}
</style>
