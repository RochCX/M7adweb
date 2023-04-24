<template>
    <button class="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#curso-nuevo" @click="crearCurso">
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
                <td>${{ parseInt(curso.precio).toLocaleString('es-cl') }}</td>
                <td>{{ curso.duracion }}</td>
                <td>{{ curso.cupos }}</td>
                <td>{{ curso.inscritos }}</td>
                <td :class="curso.estado ? 'verde' : 'rojo'">{{ curso.estado ? "Disponible" : "No Disponible" }}</td>
                <td @click="editarCurso(curso)" data-bs-toggle="modal" data-bs-target="#curso-nuevo"><font-awesome-icon
                        class="boton" :icon="['fas', 'pen-to-square']" /></td>
                <td @click="modalBorrar(curso.id)"><font-awesome-icon class="boton" :icon="['fas', 'fa-trash']" /></td>
            </tr>
        </tbody>
    </table>

    <!-- Modal -->
    <div class="modal fade" id="curso-nuevo" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">{{ headerModal }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="text" class="form-control my-3" placeholder="Nombre del Curso"
                        v-model="datosModal.inputNombre">
                    <input type="text" class="form-control my-3" placeholder="Imagen del Curso"
                        v-model="datosModal.inputImg">
                    <input type="text" class="form-control my-3" placeholder="Descripción del Curso"
                        v-model="datosModal.inputDescripcion">
                    <input type="text" class="form-control my-3" placeholder="Precio del Curso"
                        v-model="datosModal.inputPrecio">
                    <input type="text" class="form-control my-3" placeholder="Duracion del Curso"
                        v-model="datosModal.inputDuracion">
                    <input type="text" class="form-control my-3" placeholder="Cupos del Curso"
                        v-model="datosModal.inputCupos">
                    <input type="text" class="form-control my-3" placeholder="Inscritos del Curso"
                        v-model="datosModal.inputInscritos">
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
                            v-model="datosModal.inputEstado">
                        <label class="form-check-label" for="flexSwitchCheckDefault">{{ datosModal.inputEstado ? "Disponible"
                            : "No Disponible" }}</label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button v-if="headerModal == 'Crear Curso'" type="button" class="btn btn-primary"
                        data-bs-dismiss="modal" @click="agregarCurso">
                        {{ headerModal }}</button>
                    <button v-else type="button" class="btn btn-primary" data-bs-dismiss="modal"
                        @click="modificarCurso">{{ headerModal }}</button>
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
            headerModal: "Crear Curso",
            cursoEdit: {},
            datosModal: {
                inputNombre: "",
                inputDescripcion: "",
                inputPrecio: "",
                inputDuracion: "",
                inputCupos: "",
                inputInscritos: "",
                inputImg: "https://placehold.co/600x400",
                inputEstado: false,
            },

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

        crearCurso() {
            this.headerModal = "Crear Curso";
            this.vaciarCurso();
        },

        vaciarCurso() {
            this.datosModal.inputNombre = "",
                this.datosModal.inputDescripcion = "",
                this.datosModal.inputPrecio = "",
                this.datosModal.inputDuracion = "",
                this.datosModal.inputCupos = "",
                this.datosModal.inputInscritos = "",
                this.datosModal.inputEstado = "",
                this.datosModal.inputImg = ""
        },

        editarCurso(objeto) {
            this.headerModal = "Editar Curso",
                this.datosModal.inputNombre = objeto.nombre,
                this.datosModal.inputDescripcion = objeto.descripcion,
                this.datosModal.inputPrecio = objeto.precio,
                this.datosModal.inputDuracion = objeto.duracion,
                this.datosModal.inputCupos = objeto.cupos,
                this.datosModal.inputInscritos = objeto.inscritos,
                this.datosModal.inputEstado = objeto.estado,
                this.datosModal.inputImg = objeto.img
            this.cursoEdit = objeto;
        },

        async modificarCurso() {
            await setDoc(doc(db, "cursos", this.cursoEdit.id), {
                id: this.cursoEdit.id,
                nombre: this.datosModal.inputNombre,
                descripcion: this.datosModal.inputDescripcion,
                precio: this.datosModal.inputPrecio,
                duracion: this.datosModal.inputDuracion,
                cupos: this.datosModal.inputCupos,
                inscritos: this.datosModal.inputInscritos,
                estado: this.datosModal.inputEstado,
                img: this.datosModal.inputImg
            });
            Swal.fire({
                title: '¡Editado!',
                text: 'El curso se ha editado correctamente',
                icon: 'success',
            });
            this.actualizarCursos();
        },

        async agregarCurso() {
            const docRef = await addDoc(collection(db, "cursos"), {});
            docRef;
            await setDoc(doc(db, "cursos", docRef.id), {
                id: docRef.id,
                nombre: this.datosModal.inputNombre,
                descripcion: this.datosModal.inputDescripcion,
                precio: this.datosModal.inputPrecio,
                duracion: this.datosModal.inputDuracion,
                cupos: this.datosModal.inputCupos,
                inscritos: this.datosModal.inputInscritos,
                estado: this.datosModal.inputEstado,
                img: this.datosModal.inputImg
            });
            Swal.fire({
                title: '¡Creado!',
                text: 'El curso se ha creado correctamente',
                icon: 'success',
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

.verde {
    color: green
}

.rojo {
    color: red;
}</style>