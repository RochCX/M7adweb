import { createStore } from 'vuex'
import { Cursos } from '@/services/CursosDisponibles.js'

export default createStore({
  state: {
    cursos: Cursos.getCursos(),
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
