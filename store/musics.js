import MusicService from '~/services/MsuicService'
export const state = () => ({
  musics: [],
  music: {}
})

export const mutations = {
  SET_MUSICS(state, musics) {
    state.musics = musics
  },
  SET_MUSIC(state, music) {
    state.music = music
  }
}

export const actions = {
  fetchMusics({ commit }) {
    return MusicService.getMusics().then((response) => {
      commit('SET_MUSICS', response.data.data)
    })
  },
  fetchMusic({ commit }, id) {
    return MusicService.getMusic(id).then((response) => {
      commit('SET_MUSIC', response.data.data)
    })
  }
}
