import { createStore } from 'vuex'
import { Cursos } from '@/services/CursosDisponibles.js'

export default createStore({
  state: {
    cursos: Cursos.getCursos(),
  },
  getters: {
  },
  mutations: {
    agregarCurso(state, payload) {
      state.cursos.push(payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
