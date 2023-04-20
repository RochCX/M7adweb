<template>
  <h1>Inicio de Sesión</h1>
  <div class="container">
    <div class="row my-5 justify-content-center">
      <div class="col-md-6 my-5 ">
        <div class="card shadow-lg">
          <div class="card-header bg-success text-white">
            <p class="h3">Ingreso</p>
          </div>
          <div class="card-body bg-light">
            <font-awesome-icon :icon="['fas', 'trash']" />
            <!-- <form @submit.prevent="validarLogin({usuario: user.email, contrasena: user.password, usuarios: usuarios})">
                <input v-model="user.email"  class="form-control mt-3" placeholder="Email" type="email">
                <input v-model="user.password"  class="form-control mt-3" placeholder="Password" type="password">
                <input class="btn btn-success mt-3" type="submit" value="Ingresar">
            </form>
            <div v-if="!loggin" class="mt-4">{{mensajeError}}</div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
