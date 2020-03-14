<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-sheet color="primary" tile dark>
        <v-list two-line>
          <v-list-item>
            <v-avatar class="ma-2">
              <v-img
                :alt="$auth.user.full_name"
                :src="$auth.user.avatar || ''"
              ></v-img>
            </v-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ $auth.user.full_name }}</v-list-item-title>
              <v-list-item-subtitle>{{
                $auth.user.mobile
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-sheet>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="(item, i) in items" :key="i" @click="">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-weather-night</v-icon>
          </v-list-item-icon>
          <v-switch
            dense
            hide-details
            class="ma-0"
            @change="toggleDark"
            v-model="dark"
          ></v-switch>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar fixed app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>

    <v-content>
      <nuxt keep-alive />
    </v-content>

    <v-bottom-navigation
      v-model="menuIndex"
      app
      shift
      width="100%"
      fixed
      color="primary"
    >
      <v-btn to="/categories">
        <span>Categories</span>
        <v-icon>mdi-layers</v-icon>
      </v-btn>

      <v-btn to="/search">
        <span>Search</span>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn to="/">
        <span>Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn to="/movies">
        <span>Movie</span>
        <v-icon>mdi-movie</v-icon>
      </v-btn>

      <v-btn to="/artists">
        <span>Artists</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<style lang="scss" scoped>
.v-item-group.v-bottom-navigation .v-btn {
  min-width: 20%;
}
</style>

<script>
export default {
  name: 'app',

  data() {
    return {
      drawer: false,
      dark: localStorage.dark === 'true',
      title: 'The Bank',
      menuIndex: null,
      item: 0,
      items: [
        { text: 'My Files', icon: 'mdi-folder' },
        { text: 'Shared with me', icon: 'mdi-account-multiple' },
        { text: 'Starred', icon: 'mdi-star' },
        { text: 'Recent', icon: 'mdi-history' },
        { text: 'Offline', icon: 'mdi-check-circle' },
        { text: 'Uploads', icon: 'mdi-upload' },
        { text: 'Backups', icon: 'mdi-cloud-upload' }
      ]
    }
  },
  middleware: 'auth',
  created() {
    console.log(this.dark)
    switch (this.$route.name) {
      case 'search':
        this.menuIndex = 1
        break
      case 'categories':
        this.menuIndex = 0
        break
      case 'movies':
        this.menuIndex = 3
        break
      case 'artists':
        this.menuIndex = 4
        break
      default:
        this.menuIndex = 2
        break
    }
  },
  methods: {
    toggleDark() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      localStorage.dark = this.$vuetify.theme.dark
    }
  }
}
</script>
