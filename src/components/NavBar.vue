<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary success" data-bs-theme="dark" v-if="conectado">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
        <img src="../assets/logo.png" alt="" class="logo" style="height: 100px;">
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link active" aria-current="page" href="#"><router-link to="/home">Home</router-link></a>
        <a class="nav-link active" aria-current="page" href="#"><router-link to="/register">Registro</router-link></a>
        <a class="nav-link active" href="#"  data-bs-toggle="modal" data-bs-target="#loggoutModal">Cerrar sesión</a>
        <!-- <a class="nav-link active" aria-current="page" href="#"><router-link to="/">Home</router-link></a> -->
      </div>
    </div>
    <div class="d-flex justify-content-end align-items-end" aria-current="page" style="color: white;" data-bs-toggle="modal" data-bs-target="#loggoutModal"><div class="p-2 justify-content-end align-items-end">{{ nameMail }}</div></div>
  </div>
  <br>
  <div class="modal fade" id="loggoutModal" data-bs-theme="light" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel"> Ya te vas?</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  Seguro quieres cerrar sesion?
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                  <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
                    <router-link to="/" class="nav-link active" @click.prevent = "desloggear">Logout</router-link>
                  </button>
                </div>
              </div>
            </div>
          </div>
</nav>

</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
    computed: {
    ...mapState(["conectado"]),
    ...mapState(["nameMail"]),
  },
  methods:{
    ...mapMutations(["desloggear"]),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
