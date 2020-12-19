import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginInfo: {
      isLoggedIn: false,
      token: null,
      id: null,
      username: null,
      identity: null,
      mail: null
    },
    loginVisible: false,
    room: null,
    chat: false,
    drawType: '',
  },
  getters: {
  },
  mutations: {
    TOOGLE_TOOLS: (state, type) => {
      state.drawType = type
    }
  },
  actions: {
  },
  modules: {
  }
})
