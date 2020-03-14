<template>
  <div>
    <v-app-bar app fixed>
      <v-toolbar-title><small>Update Profile</small></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn :loading="processing" :disabled="processing" @click="save()" icon>
        <v-icon>mdi-check</v-icon>
      </v-btn>
    </v-app-bar>

    <v-container>
      <!-- avatar -->
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <div class="card vue-avatar-cropper-demo text-center">
                <v-avatar
                  @click="sheet = true"
                  :color="!user.avatar || image_upload_loading ? 'primary' : ''"
                  size="120"
                  class="elevation-10"
                >
                  <div v-if="image_upload_loading" class="d-flex">
                    <v-progress-circular
                      indeterminate
                      color="white"
                    ></v-progress-circular>
                  </div>
                  <template v-else>
                    <v-img
                      v-if="user.avatar"
                      v-else
                      :lazy-src="user.avatar || ''"
                      :src="user.avatar || ''"
                      class="d-flex"
                    ></v-img>
                    <v-icon v-else large color="white">mdi-image</v-icon>
                  </template>
                </v-avatar>

                <span
                  id="pick-avatar"
                  ref="pick_avatar"
                  style="visibility: hidden"
                ></span>

                <avatar-cropper
                  :uploadHandler="uploadPhoto"
                  trigger="#pick-avatar"
                  :labels="buttons"
                />
              </div>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="user.first_name"
                label="First Name"
                dense
              ></v-text-field>
              <v-text-field
                v-model="user.last_name"
                label="Last Name"
                dense
              ></v-text-field>
              <v-text-field
                v-model="user.email"
                label="Email"
                dense
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-bottom-sheet v-model="sheet">
        <v-list dense>
          <v-list-item @click="takePhoto()" dense>
            <v-list-item-avatar>
              <v-avatar size="32px">
                <v-icon>mdi-camera</v-icon>
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-title>Take Photo</v-list-item-title>
          </v-list-item>

          <v-list-item @click="pickAvatar()" dense>
            <v-list-item-avatar>
              <v-avatar size="32px">
                <v-icon>mdi-image</v-icon>
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-title>Upload from gallery</v-list-item-title>
          </v-list-item>

          <v-list-item @click="deleteAvatar()" dense>
            <v-list-item-avatar>
              <v-avatar size="32px">
                <v-icon color="red">mdi-delete</v-icon>
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-title class="red--text"
              >Remove photo</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-bottom-sheet>
      <v-camera v-model="show_camera" @captured="captured"></v-camera>
    </v-container>
  </div>
</template>

<style lang="scss">
.vue-avatar-cropper-demo {
  max-width: 18em;
  margin: 0 auto;
}

.avatar {
  width: 160px;
  border-radius: 6px;
  display: block;
  margin: 20px auto;
}

.card-img-overlay {
  display: none;
  transition: all 0.5s;
}

.card-img-overlay button {
  margin-top: 20vh;
}

.card:hover .card-img-overlay {
  display: block;
}

.avatar-cropper-btn {
  color: black;
}
</style>
<script>
import AvatarCropper from 'vue-avatar-cropper'
import VCamera from '../components/VCamera/VCamera'

export default {
  components: { AvatarCropper, VCamera },
  layout: 'settings',
  async asyncData({ $axios }) {
    const { user } = await $axios.$get('auth/user')
    return { user: user }
  },
  data() {
    return {
      message: 'ready',
      sheet: false,
      processing: false,
      image_upload_loading: false,
      // user: () => (this.$auth.user),
      image: '',
      buttons: {
        submit: 'OK',
        cancel: 'Cancel'
      },

      show_camera: false
    }
  },
  methods: {
    pickAvatar() {
      this.$refs.pick_avatar.click()
      this.sheet = false
    },
    async captured(image) {
      this.image_upload_loading = true
      let form = new FormData()
      form.append('avatar', image.blob, 'avatar')
      const config = {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${form._boundary}`
        }
      }
      await this.$axios
        .put('auth/avatar', form, config)
        .then((response) => {
          this.user.avatar = response.data
        })
        .catch()
        .finally(() => (this.image_upload_loading = false))
    },

    async uploadPhoto(cropper) {
      this.image_upload_loading = true
      cropper.getCroppedCanvas(this.outputOptions).toBlob(
        async (blob) => {
          let form = new FormData()
          form.append('avatar', blob, 'avatar')
          const config = {
            headers: {
              'Content-Type': `multipart/form-data; boundary=${form._boundary}`
            }
          }
          await this.$axios
            .put('auth/avatar', form, config)
            .then((response) => {
              this.user.avatar = response.data
            })
            .catch()
            .finally(() => (this.image_upload_loading = false))
        },
        this.outputMime,
        this.outputQuality
      )
    },
    takePhoto() {
      this.show_camera = true
      this.sheet = false
    },
    async deleteAvatar() {
      this.sheet = false
      this.image_upload_loading = true
      await this.$axios
        .put('auth/avatar', { delete_avatar: true })
        .then((response) => {
          this.user.avatar = ''
        })
        .catch()
        .finally(() => (this.image_upload_loading = false))
    },

    save: async function() {
      this.processing = true
      await this.$axios
        .put('auth/user', this.user)
        .then((response) => {
          this.$router.push('/')
        })
        .catch()
        .finally(() => (this.image_upload_loading = false))
    }
  }
}
</script>
