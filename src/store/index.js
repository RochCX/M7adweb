import { createStore } from 'vuex'

export default createStore({
  state: {
    conectado: false,
  },
  getters: {
  },
  mutations: {
    agregarCurso(state, payload) {
      state.cursos.push(payload)
    },
    loggear(state){
      state.conectado = true;
    }
  },
  actions: {
  },
  modules: {
  }
})
