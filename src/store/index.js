import { createStore } from 'vuex'

export default createStore({
  state: {
    conectado: false,
    nameMail: "",
  },
  getters: {
  },
  mutations: {
    agregarCurso(state, payload) {
      state.cursos.push(payload)
    },
    loggear(state){
      state.conectado = true;
    },
    desloggear(state){
      state.conectado = false;
    }
  },
  actions: {
  },
  modules: {
  }
})
