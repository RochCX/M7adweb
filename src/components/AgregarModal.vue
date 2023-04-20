<template>
    <div class="row py-3">
        <div class="col justify-content-center">
            <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Agregar
                Curso&nbsp;&nbsp;&nbsp;<font-awesome-icon :icon="['fas', 'plus']" beat /></a>
        </div>
    </div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Agregar Curso</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="row mb-3">
                            <div class="col">
                                <input class="form-control" type="text" placeholder="Nombre del Curso" v-model="objeto.nombre">
                            </div>
                            <div class="col">
                                <input class="form-control" type="text" placeholder="Descripción del Curso" v-model="objeto.descripcion">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <input class="form-control"  type="text" placeholder="Código del Curso" v-model="objeto.codigo">
                            </div>
                        </div>
                        
                        
                        
                        
                        <!-- <input type="text" placeholder="Precio del Curso">
                        <input type="text" placeholder="Cantidad de Alumnos Inscritos">
                        <input type="text" placeholder="Cantidad de Inscritos">
                        <input type="text" placeholder="Cantidad de Inscritos">
                        <input type="radio" id="html" name="estado-curso" value="true">
                        <label for="html">Disponible</label><br>
                        <input type="radio" id="css" name="estado-curso" value="false">
                        <label for="css">No Disponible</label><br> -->
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" @click="agregarCurso(objeto)">Agregar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapMutations } from 'vuex';

export default {
    data() {
        return {
            objeto: {
                codigo: '',
                nombre: '', 
                estado: true,
                descripcion: '',
                cupos: 0,
                inscritos: 0,
                duracion: '0 meses',
                precio: 0,
                img: 'https://placehold.co/600x400.png'
            }
        }
    },
    methods: {
        ...mapMutations(['agregarCurso'])
    }

}

</script>