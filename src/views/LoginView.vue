<template>
  <h1>Inicio de Sesión</h1>
  <div class="container app">
    <div class="row my-5 justify-content-center">
      <div class="col-md-6 my-5 ">
        <div class="card shadow-lg">
          <div class="card-header bg-success text-white">
            <p class="h3">Ingreso</p>
          </div>
          <div class="card-body bg-light">
            <font-awesome-icon :icon="['fas', 'cat']" />
            <form >
                <input v-model.trim="loginForm.email"  class="form-control mt-3" placeholder="Email" type="email">
                <input v-model.trim="loginForm.password"  class="form-control mt-3" placeholder="Password" type="password">
                <button class="btn btn-success mt-3" value="Ingresar" @click.prevent="login()">Ingresar</button>
                <button class="btn btn-success mt-3" value="Token" @click.prevent="accessToken()">Access Token</button>
                <button class="btn btn-success mt-3" value="chao" @click.prevent="loggout()">Chao</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { mapState, mapMutations } from "vuex";
import {auth} from "../auth/auth.service.js"
import store from "@/store";
// import Swal from 'sweetalert2'
// import router from "@/router";
const state = store.state;


export default {
  name: 'LoginVue',
  components: {
    // FooterPage,
    // CarritoCompras
  },
  data: function() {
      return {
        loginForm: {
            email: '',
            password: ''
        },
        // estado: false,
    };
  },
  computed:{
  },
  methods:{
  login() {
      auth
        .signInWithEmailAndPassword(
          this.loginForm.email,
          this.loginForm.password
        )
        .then(function (fbUser) {
          console.log('Respuesta ',fbUser);
          state.conectado = true;
          console.log(state.conectado);
          // router.push('/home')
        })
        .catch((err) => {
          console.log(err);
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Como tan weon',
          //   text: "Usuario o contraseña incorrectos",
          //   footer: '<a href="/register">No tienes cuenta? has click aqui</a>'
          // })
        });
    },
    async accessToken() {
      const token = await auth.currentUser?.getIdToken();
      console.log(token);
    },
  loggout(){
    if (state.conectado == true){
      state.conectado = false;
      console.log(state.conectado);
    }
    else{
      alert("no te has conectado")
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
</style>

