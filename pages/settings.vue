<template>
  <div class="overflow-hidden">
    <v-app-bar
      app
      shrink-on-scroll
      prominent
      scroll-target="#scrolling-techniques-5"
      scroll-threshold="80"
    >
      <v-btn icon @click="back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-toolbar-title class="pa-0 ma-0">
        <v-avatar size="45" class="ma-0 pa-0">
          <v-img :src="$auth.user.avatar || ''"></v-img>
        </v-avatar>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-view-module</v-icon>
      </v-btn>

      <v-btn color="primary" dark small absolute bottom right fab>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-app-bar>

    <v-sheet
      id="scrolling-techniques-5"
      class="overflow-y-auto"
      max-height="400"
    >
      <v-list dense two-line>
        <v-subheader>Account</v-subheader>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ $auth.user.mobile }}</v-list-item-title>
            <v-list-item-subtitle
              >Tap to change phone number</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{
              $auth.user.username || 'Tap to specify username'
            }}</v-list-item-title>
            <v-list-item-subtitle>Username</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ $auth.user.full_name }}</v-list-item-title>
            <v-list-item-subtitle>Bio</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
      </v-list>

      <v-list dense>
        <v-subheader>Settings</v-subheader>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-bell</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Notification and Sounds</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider inset></v-divider>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-lock</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Privacy and Security</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider inset></v-divider>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-harddisk</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Data and Storage</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider inset></v-divider>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-music</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Music Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider inset></v-divider>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-laptop</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Device</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider inset></v-divider>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-web</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Language</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-footer app>
        kklkl
      </v-footer>
    </v-sheet>
  </div>
</template>

<style lang="scss"></style>

<script>
export default {
  layout: 'settings',
  data() {
    return {}
  },
  methods: {
    back() {
      if (window.history.length > 2) this.$router.back()
      else this.$router.push('/')
    }
  }
}
</script>
