import { createStore } from 'vuex'
let logCheck = JSON.parse(localStorage.getItem('connect'))

export default createStore({
  state: {
    conectado: logCheck,
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
      logCheck = JSON.parse(localStorage.setItem('connect',false));
      state.conectado = false;
    }
  },
  actions: {
  },
  modules: {
  }
})
