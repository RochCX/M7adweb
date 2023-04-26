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
              <input v-model="correoIngresado" type="email" class="form-control" id="email" placeholder="Ingrese su correo electrónico" required>
            </div>
          </div>
          <div class="form-group">
            <label for="password">Contraseña</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text"><font-awesome-icon :icon="['fa','fa-lock']"/></span>
              </div>
              <input v-model="passIngresado" type="password" class="form-control" id="password" placeholder="Ingrese su contraseña" required>
            </div>
          </div>
          <button @click.prevent="dameDatos()" class="btn btn-success btn-block mt-4">Registrarse</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      correoIngresado: '',
      passIngresado: '',
    }
  },
  methods:{
    dameDatos() {
  const auth = getAuth();

  // Validación de campo vacío para correo
  if (!this.correoIngresado) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Debe ingresar un correo.',
    });
    return;
  }

  // Validación del correo electrónico
  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.correoIngresado)) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor, ingrese un correo electrónico válido.',
    });
    return;
  }

  // Validación de campo vacío para contraseña
  if (!this.passIngresado) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Debe ingresar una contraseña.',
    });
    return;
  }

  // Validación de la contraseña
  if (!/[A-Z]/.test(this.passIngresado) || !/\d{2}/.test(this.passIngresado) || this.passIngresado.length < 6) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'La contraseña debe tener al menos 6 caracteres, una mayúscula y al menos 2 números.',
    });
    return;
  }

  createUserWithEmailAndPassword(auth, this.correoIngresado, this.passIngresado)
    .then((userCredential) => {
      console.log("Nuevo usuario registrado: " + userCredential.user.uid);
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'El usuario ha sido registrado exitosamente.',
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
        footer: errorCode
      })
    });
  console.log(this.correoIngresado, this.passIngresado)
}
  }
}
</script>

<style scoped>
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