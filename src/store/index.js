import { createStore } from 'vuex'


export default createStore({
  state: {
    conectado: false,
  },
  getters: {
  },
  mutations: {
    loggear(state){
      state.conectado = true;
    }
  },
  actions: {
  },
  modules: {
  }
})
