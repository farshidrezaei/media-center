window.onNuxtReady(({ $vuetify }) => {
  $vuetify.theme.dark = localStorage.dark === 'true'
})
