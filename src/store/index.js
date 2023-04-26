import { createStore } from 'vuex'
import { db } from '@/firebase/index.js'
import { collection, getDocs, doc, addDoc, deleteDoc, setDoc } from "firebase/firestore";
import Swal from 'sweetalert2';
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
    },
    async eliminarCurso({dispatch}, elemento) {
      await deleteDoc(doc(db, "cursos", elemento));
      dispatch('cargarCursos')
    },
    async agregarCurso({dispatch}, payload) {
      const objeto = {...payload};
      const docRef = await addDoc(collection(db, "cursos"), {});
      docRef;
      await setDoc(doc(db, "cursos", docRef.id), {
          id: docRef.id,
          nombre: objeto.inputNombre,
          descripcion: objeto.inputDescripcion,
          codigo: objeto.inputCodigo,
          precio: objeto.inputPrecio,
          duracion: objeto.inputDuracion,
          cupos: objeto.inputCupos,
          inscritos: objeto.inputInscritos,
          estado: objeto.inputEstado,
          img: objeto.inputImg
      });
      dispatch('cargarCursos')
      Swal.fire({
          title: '¡Creado!',
          text: 'El curso se ha creado correctamente',
          icon: 'success',
      });
      
    },
    async modificarCurso({dispatch}, payload) {
          const objeto = {...payload};
       await setDoc(doc(db, "cursos", objeto.cursoID), {
          id: objeto.cursoID,
          nombre: objeto.inputNombre,
          descripcion: objeto.inputDescripcion,
          codigo: objeto.inputCodigo,
          precio: objeto.inputPrecio,
          duracion: objeto.inputDuracion,
          cupos: objeto.inputCupos,
          inscritos: objeto.inputInscritos,
          estado: objeto.inputEstado,
          img: objeto.inputImg
      });
      Swal.fire({
          title: '¡Editado!',
          text: 'El curso se ha editado correctamente',
          icon: 'success',
      }); 
      dispatch('cargarCursos')
  },
  },
  modules: {
  }
})
