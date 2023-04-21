<template>
    <!-- <AgregarModal></AgregarModal> -->
    <div v-if="cargando" id="carga">
		<PulseLoader></PulseLoader>
	</div>
    <div class="container" v-else>
        <div class="row g-3">
            <div class="col-3" v-for="curso in cursos" :key="curso.codigo">
                <div class="card" :class="curso.estado ? '' : 'card--gris'">
                    <div class="card-header">
                        Curso de {{ curso.nombre }}
                    </div>
                    <img :src="curso.img" class="card-img-top" alt="">
                    <div class="card-body">
                        <p class="card-text">Descripción: {{ curso.descripcion }}</p>
                        <p>Cupos: {{ curso.cupos }}</p>
                        <p>Inscritos: {{ curso.inscritos }}</p>
                        <p>Duración: {{ curso.duracion }}</p>
                        <p>${{ parseInt(curso.precio).toLocaleString('es-cl') }}</p>
                        <p>{{ curso.estado ? 'Disponible' : 'No Disponible' }}</p>
                        <!-- <a href="#" class="btn btn-primary">Editar</a>
                        <a href="#" class="btn btn-warning">Eliminar</a> -->
                    </div>
                </div>
            </div>




        </div>
    </div>
</template>

<script>

// import AgregarModal from '@/components/AgregarModal.vue'
import { db } from '@/firebase/index.js'
import { collection, getDocs } from "firebase/firestore";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'


export default {
    data() {
        return {
            cardGris: false,
            cursos: [],
            cargando: false,
        }
    },
    components: {
        // AgregarModal
        PulseLoader
    },
    created: async function () {
        try {
            this.cargando = true;
            const querySnapshot = await getDocs(collection(db, "cursos"));      
            querySnapshot.forEach((doc) => {
                this.cursos.push(doc.data()) })
            this.cargando = false;
            } catch (error) {
                this.errorMessage = error;
            }
        },
    }
</script>

<style scoped>
.card--gris {
    filter: grayscale(1);
}

.card img {
    margin-top: 1em;
    max-height: 100px;
    object-fit: scale-down;

}

.btn {
    margin: 0.2em;
}
</style>
