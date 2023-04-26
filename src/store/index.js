import { createStore } from 'vuex'
import { db } from '@/firebase/index.js'
import { collection, getDocs } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import router from "@/router";
const auth = getAuth();


export default createStore({
  state: {
    conectado: false,
    nameMail: "",
    cursos: [],
    fireMail: "",
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
      signOut(auth).then(() => {
        // Sign-out successful.
        state.conectado = false;
        router.push('/')
      }).catch((error) => {
        // An error happened.
        alert(error);
      });

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
