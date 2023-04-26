import { createStore } from 'vuex'
import { db } from '@/firebase/index.js'
import { collection, getDocs } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth();

// let estado = localStorage.getItem('connect',false)
// let logCheck = JSON.parse(estado)

export default createStore({
  state: {
    conectado: false,
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
    mirame(state){
      if (this.$route.name === '/'){
        return false;
      } else if(state.conectado === true){
        return true;
      }
    },
    desloggear(state){
      signOut(auth).then(() => {
        // Sign-out successful.
        state.conectado = false;
      }).catch((error) => {
        // An error happened.
        alert(error);
      });
      // localStorage.getItem('connect')
      // localStorage.setItem('connect',false)
      // logCheck = JSON.parse(localStorage.getItem('connect'));
      
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
