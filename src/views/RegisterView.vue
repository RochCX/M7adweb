<template>
  <h1>Registro de Usuario</h1>
  <div class="container my-5">
    <div class="card shadow-lg">
      <div class="card-header bg-success text-white">
        <h4 class="mb-0">Registro de Usuario</h4>
      </div>
      <div class="card-body bg-light">
        <form>
          <font-awesome-icon :icon="['fas', 'cat']" />
          <div class="form-group">
            <label for="email">Correo electrónico</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text"><font-awesome-icon :icon="['fa','fa-envelope']"/></span>
              </div>
              <input v-model="correoIngresado" type="email" class="form-control" id="email" placeholder="Ingrese su correo electrónico">
            </div>
          </div>
          <div class="form-group">
            <label for="password">Contraseña</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text"><font-awesome-icon :icon="['fa','fa-lock']"/></span>
              </div>
              <input v-model="passIngresado" type="password" class="form-control" id="password" placeholder="Ingrese su contraseña">
            </div>
          </div>
          <button @click.prevent="dameDatos()" class="btn btn-success btn-block mt-4">Registrarse</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// import {getAuth} from 'firebase/auth'

// export default {
//   data() {
//     return {
//       correoIngresado: "",
//       passIngresado: "",
//     }
//   },
//   methods:{
//     dameDatos(){
//       getAuth()
//       .createUser({
//         email: correoIngresado,
//         emailVerified: true,
//         password: passIngresado,
//         photoURL: 'http://www.example.com/12345678/photo.png',
//         disabled: false,
//       })
//       .then((userRecord) => {
//         // See the UserRecord reference doc for the contents of userRecord.
//         console.log('Successfully created new user:', userRecord.uid);
//       })
//       .catch((error) => {
//         console.log('Error creating new user:', error);
//       })
//       console.log(this.correoIngresado, this.passIngresado)
//     }
//   }
// }
</script>

<style>
    body {
      background-color: #fff;
    }
    .card {
      width: 80%;
      margin: 0 auto;
      margin-top: 30px;
      border: none;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.2);
    }
    .card-header {
      background-color: #28a745;
      color: #fff;
      text-align: center;
      font-weight: bold;
      border-bottom: none;
      padding: 30px;
    }
    .card-header i {
      font-size: 50px;
    }
    .card-body {
      padding: 30px;
    }
    .form-group label {
      font-weight: bold;
    }
    #email,
    #password {
      margin-bottom: 15px;
    }
    .btn {
      background-color: #28a745;
      border: none;
      padding: 10px 20px;
      font-weight: bold;
      letter-spacing: 1px;
      margin-top: 30px;
    }
    .btn:hover {
      background-color: #218838;
    }
  </style>
