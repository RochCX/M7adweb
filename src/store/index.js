import { createStore } from 'vuex'
let estado = localStorage.getItem('connect')
let logCheck = JSON.parse(estado)

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
      let desconecta = localStorage.setItem('connect',false)
      logCheck = JSON.parse(desconecta);
      state.conectado = false;
    }
  },
  actions: {
  },
  modules: {
  }
})
