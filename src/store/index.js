import { createStore } from 'vuex'
import { db } from '@/firebase/index.js'
import { collection, getDocs, doc, addDoc, deleteDoc, setDoc } from "firebase/firestore";
import Swal from 'sweetalert2';
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
    },
    async eliminarCurso(state, elemento) {
      await deleteDoc(doc(db, "cursos", elemento));
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
      Swal.fire({
          title: '¡Creado!',
          text: 'El curso se ha creado correctamente',
          icon: 'success',
      });
      dispatch('cargarCursos')
    },
    async modificarCurso({dispatch}, payload) {
          const objeto = {...payload};
          console.log(objeto)
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
