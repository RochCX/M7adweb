<template>
    <button class="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#curso-nuevo">
        Agregar Curso
    </button>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Precio</th>
                <th scope="col">Duracion</th>
                <th scope="col">Cupos</th>
                <th scope="col">Inscritos</th>
                <th scope="col">Estado</th>
                <th scope="col">Editar</th>
                <th scope="col">Eliminar</th>
            </tr>
        </thead>
        <div v-if="cargando" id="carga">
            <PulseLoader></PulseLoader>
        </div>
        <tbody v-else v-for="curso in cursos" :key="curso.codigo">
            <tr>
                <td>{{ curso.nombre }}</td>
                <td>{{ curso.descripcion }}</td>
                <td>{{ curso.precio }}</td>
                <td>{{ curso.duracion }}</td>
                <td>{{ curso.cupos }}</td>
                <td>{{ curso.inscritos }}</td>
                <td>{{ curso.estado ? "Disponible" : "No Disponible" }}</td>
                <td><font-awesome-icon class="boton" :icon="['fas', 'pen-to-square']" /></td>
                <td @click="modalBorrar(curso.id)"><font-awesome-icon class="boton" :icon="['fas', 'fa-trash']" /></td>
            </tr>
        </tbody>
    </table>

    <!-- Modal -->
    <div class="modal fade" id="curso-nuevo" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <input type="text" class="form-control" placeholder="Nombre del Curso" v-model="inputNombre">
        <input type="text" class="form-control" placeholder="Descripción del Curso" v-model="inputDescripcion">
        <input type="text" class="form-control" placeholder="Precio del Curso" v-model="inputPrecio">
        <input type="text" class="form-control" placeholder="Duracion del Curso" v-model="inputDuracion">
        <input type="text" class="form-control" placeholder="Cupos del Curso" v-model="inputCupos">
        <input type="text" class="form-control" placeholder="Inscritos del Curso" v-model="inputIncritos">
        <input type="text" class="form-control" placeholder="Estado del Curso" v-model="inputNombre">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary">Agregar Curso</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { db } from '@/firebase/index.js'
import { collection, getDocs, doc, deleteDoc, addDoc, setDoc } from "firebase/firestore";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import Swal from 'sweetalert2'

export default {

    // Modal

    data() {
        return {
            cursos: [],
            cargando: false,
        }
    },
    components: {
        // AgregarModal
        PulseLoader
    },
    methods: {
        async actualizarCursos() {
            this.cursos = [];
            this.cargando = true;
            const querySnapshot = await getDocs(collection(db, "cursos"));
            querySnapshot.forEach((doc) => {
                this.cursos.push(doc.data())
            })
            this.cargando = false;
        },

        async retornarAlgo(elemento) {
            await console.log(elemento)
            console.log(getDocs(db, "cursos").data())
        },

        async eliminarCurso(elemento) {
            await deleteDoc(doc(db, "cursos", elemento))
            this.actualizarCursos();
        },

        modalBorrar(laID) {
            Swal.fire({
                title: '¿Deseas eliminar este curso?',
                showCancelButton: true,
                confirmButtonText: 'Eliminar',
            }).then(result => {
                if (result.isConfirmed) {
                    this.eliminarCurso(laID)
                    Swal.fire('Eliminado!', '', 'success')
                } else if (result.isDenied) {
                    Swal.fire('Acción cancelada', '', 'info')
                }
            })
        },

        async agregarCurso() {
            const docRef = await addDoc(collection(db, "cursos"), {});
            docRef;
            await setDoc(doc(db, "cursos", docRef.id), {
                id: docRef.id,
                nombre: "Curso de Prueba",
                descripcion: "Testing "
            });
            this.actualizarCursos();
        }
    },
    created: async function () {
        this.actualizarCursos()
    }
}
</script>

<style scoped>
.boton {
    cursor: pointer
}
</style>