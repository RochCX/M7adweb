import { createStore } from 'vuex'
import { db } from '@/firebase/index.js'
import { collection, getDocs } from "firebase/firestore";
let estado = localStorage.getItem('connect',false)
let logCheck = JSON.parse(estado)

export default createStore({
  state: {
    conectado: logCheck,
    nameMail: "",
    cursos: [],
  },
  getters: {
    arrayCursos(state) {
      return state.cursos;
    }
  },
  mutations: {
    loggear(state){
      state.conectado = true;
    },
    desloggear(state){
      localStorage.getItem('connect')
      localStorage.setItem('connect',false)
      logCheck = JSON.parse(localStorage.getItem('connect'));
      state.conectado = false;
    },
    cargarCursos(state, snapshot) {
      state.cursos = []
      snapshot.forEach((doc) => {
        state.cursos.push(doc.data())})
    },
  },
  actions: {
    async cargarCursos({commit}) {
      const querySnapshot = await getDocs(collection(db, "cursos"));  
      commit('cargarCursos', querySnapshot)
    }
  },
  modules: {
  }
})
