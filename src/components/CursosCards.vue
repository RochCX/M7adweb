<template>
    <!-- <AgregarModal></AgregarModal> -->
    <div v-if="arrayCursos.length==0" id="carga">
		<PulseLoader></PulseLoader>
	</div>
    <div class="container" v-else>
        <div class="row g-3">
            <div class="col-sm-6 col-md-4 col-lg-3" v-for="curso in arrayCursos" :key="curso.codigo">
                <div class="card" :class="curso.estado ? '' : 'card--gris'">
                    <div class="card-header">
                        Curso de {{ curso.nombre }}
                    </div>
                    <img :src="curso.img" class="card-img-top" alt="">
                    <div class="card-body">
                        <p class="card-text text-center">{{ curso.descripcion }}</p>
                        <hr>
                        <p><strong>Cupos:</strong> {{ curso.cupos }}</p>
                        <p><strong>Inscritos:</strong> {{ curso.inscritos }}</p>
                        <p><strong>Duración:</strong> {{ curso.duracion }}</p>
                        <hr>
                        <p class="precio text-center">${{ parseInt(curso.precio).toLocaleString('es-cl') }}</p>
                        <p :class="curso.estado ? 'verde text-center' : 'gris text-center'">{{ curso.estado ? 'Disponible' : 'No Disponible' }}</p>
                    </div>
                </div>
            </div>
      </div>
    </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
    data() {
        return {
            cardGris: false,   
        }
    },
    components: {
        // AgregarModal
        PulseLoader
    },
    created: async function () {
        try {
            this.cargarCursos();
            } catch (error) {
                this.errorMessage = error;
            }
        },
    computed: {
        ...mapGetters(['arrayCursos']),
    },
    methods: {
        ...mapActions(['cargarCursos'])
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

.card  p {
    font-size: 0.9rem;
    padding: 0;
    margin: 0
}

.precio {
    border: 1px solid var(--verde);
    color: var(--verde);
    font-weight: 700;
    border-radius: 5px;
    font-size: 1rem;
    margin: 0.5em 0!important;
    padding: .2em!important;
    box-sizing: border-box;
}

.card {
    margin-bottom: 1rem;
}

.card-header {
    background-color: #2b3035;
    color: var(--verde);
    font-weight: 700;
    padding: .7em;
}

.verde {
    font-weight: 700;
    color: var(--verde)
}

.gris {
    font-weight: 700;
    color: #c3c3c3
}

.btn {
    margin: 0.2em;
}


.card-text {
 font-style: italic;
 margin: .5em 0!important;
}

.card-body p{
    text-align: left;
}
</style>
