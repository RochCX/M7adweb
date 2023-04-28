<template>
  <div class="container app">
    <div class="row my-5 justify-content-center">
      <div class="col-md-6 my-5 ">
        <div class="card shadow-lg">
          <div class="card-header text-white">
            <p class="h3">Ingreso</p>
          </div>
          <div class="card-body bg-light">
            <font-awesome-icon :icon="['fas', 'cat']" />
            <form >
                <input v-model.trim="loginForm.email"  class="form-control mt-3" placeholder="Email" type="email" autocomplete="email">
                <input v-model.trim="loginForm.password"  class="form-control mt-3" placeholder="Password" type="password" autocomplete="password">
                <button class="btn btn-primary m-3" value="Ingresar" @click.prevent="login()">Ingresar</button>
                <br>
                <a href=""><router-link to="/register">¿No tienes cuenta? Haz click</router-link></a>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { mapState, mapMutations } from "vuex";
import {auth} from "@/firebase/index.js"
import store from "@/store";
import Swal from 'sweetalert2'
import router from "@/router";
const state = store.state;


export default {
  name: 'LoginVue',
  data: function() {
      return {
        loginForm: {
            email: '',
            password: ''
        },
        
    };
  },
  computed:{
  },
  methods:{
  login() {
      auth
        .signInWithEmailAndPassword(
          this.loginForm.email,
          this.loginForm.password,
          state.nameMail = this.loginForm.email
        )
        .then(function () {
          state.conectado = true;
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'success',
            title: 'Ingresado con exito'
          })
          router.push('/home')
        })
        .catch((err) => {
          console.log(err);
          if (!state.conectado) {
          Swal.fire({
            icon: 'error',
            title: 'Como tan weon',
            text: "Usuario o contraseña incorrectos",
            footer: '<a href="/register">¿No tienes cuenta? Haz click aquí</a>'
          })}
        });
    },
    async accessToken() {
      const token = await auth.currentUser?.getIdToken();
      console.log(token);
    },
  loggout(){
    if (state.conectado == true){
      state.conectado = false;

    }
    else{
      Swal.fire('Estás desconectado!')
    }
  }
  },
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.card-header {
  background-color: var(--gris-oscuro)!important;
}

.card-header .h3 {
  padding-top: .5em!important;
}

</style>

