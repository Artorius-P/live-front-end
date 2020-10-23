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
    },
    loginVisible: false,
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
