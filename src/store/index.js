import { createStore } from 'vuex'
let estado = localStorage.getItem('connect',false)
let logCheck = JSON.parse(estado)
console.log(logCheck)

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
      localStorage.getItem('connect')
      localStorage.setItem('connect',false)
      logCheck = JSON.parse(localStorage.getItem('connect'));
      state.conectado = false;
    }
  },
  actions: {
  },
  modules: {
  }
})
