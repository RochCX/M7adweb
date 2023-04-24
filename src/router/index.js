import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import EditarCursos from '../views/EditarCursos.vue'
import store from "@/store";
import Swal from 'sweetalert2'
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

router.beforeEach((to,from,next) => {
  if (to.path === '/' || to.path === '/register') {
    next();
  }
    else if(state.conectado == false){
      let timerInterval
                        Swal.fire({
                        title: 'Debes conectarte primero!',
                        html: 'Seras redireccionado en <b></b> milisegundos.',
                        timer: 3500,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                            const b = Swal.getHtmlContainer().querySelector('b')
                            timerInterval = setInterval(() => {
                            b.textContent = Swal.getTimerLeft()
                            }, 100)
                        },
                        willClose: () => {
                            clearInterval(timerInterval)
                        }
                        }).then((result) => {
                            next('/')
                        /* Read more about handling dismissals below */
                        if (result.dismiss === Swal.DismissReason.timer) {
                            console.log('Fui cerrado por el timer')
                        }
                        })
    } else{
      next();
  }
});

export default router
