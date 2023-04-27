import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import EditarCursos from '../views/EditarCursos.vue'
import store from "@/store";
import Swal from 'sweetalert2';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

const state = store.state;

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'registro',
    component: RegisterView
  },
  {
    path: '/crud',
    name: 'Crud',
    component: EditarCursos
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      state.conectado = true;
      state.fireMail = user.email;
    }
    else{
      state.conectado = false;
    }
  })
  if (to.path === "/" && state.conectado == true) {
    Swal.fire("Ya estas conectado!");
    return next('/home')
  }
      if (to.path !== "/" && to.path !== "/register" && state.conectado == false) {
        let timerInterval;
        Swal.fire({
          title: "Debes conectarte primero!",
          html: "Seras redireccionado en <b></b> segundos.",
          timer: 3500,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer().querySelector("b");
            timerInterval = setInterval(() => {
              b.textContent = (Swal.getTimerLeft() / 1000).toFixed(0);
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("Fui cerrado por el timer");
          }
          return next("/");
        });
      } else {
        return next();
      }
});

export default router
