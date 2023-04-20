<template>
    <AgregarModal></AgregarModal>
    <div class="container">
        <div class="row g-3">
            <div class="col-3" v-for="curso in cursos" :key="curso.codigo" v-show="curso.estado">
                <div class="card">
                    <div class="card-header">
                        Curso de {{ curso.nombre }}
                    </div>
                    <img :src="curso.img" class="card-img-top" alt="">
                    <div class="card-body">
                        <p class="card-text">Descripción: {{ curso.descripcion }}</p>
                        <p>Cupos: {{ curso.cupos }}</p>
                        <p>Inscritos: {{ curso.inscritos }}</p>
                        <p>Duración: {{ curso.duracion }}</p>
                        <p>${{ parseInt(curso.precio).toLocaleString('es') }}</p>
                        <a href="#" class="btn btn-primary">Editar</a>
                        <a href="#" class="btn btn-warning">Eliminar</a>
                    </div>
                </div>
            </div>

                      <div class="col-3" v-for="curso in cursos" :key="curso.codigo" v-show="!curso.estado">
                <div class="card card--gris" >
                    <div class="card-header">
                        Curso de {{ curso.nombre }}
                    </div>
                    <img :src="curso.img" class="card-img-top" alt="">
                    <div class="card-body">
                        <p class="card-text">Descripción: {{ curso.descripcion }}</p>
                        <p>Cupos: {{ curso.cupos }}</p>
                        <p>Inscritos: {{ curso.inscritos }}</p>
                        <p>Duración: {{ curso.duracion }}</p>
                        <p>${{ parseInt(curso.precio).toLocaleString('es') }}</p>
                        <a href="#" class="btn btn-primary">Editar</a>
                        <a href="#" class="btn btn-warning">Eliminar</a>
                    </div>
                </div>
            </div>



        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import AgregarModal from '@/components/AgregarModal.vue'

export default {

    data() {
        return {
            cardGris: false,
        }
    },
    computed: {
        ...mapState(['cursos'])
    },
    components: {
        AgregarModal
    },
    watch: {
        cursos() {
            console.log(this.cursos)
        }
    }
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
