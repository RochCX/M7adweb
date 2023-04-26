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

router.beforeEach((to,from,next) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log(uid);
      state.conectado = true;
      console.log(state.conectado);
      state.fireMail = user.email
      console.log(state.fireMail);
      if(to.path === '/' && state.conectado == true){
        Swal.fire("Ya estas conectado!")
        next('/home')
        return
      }
      next()
    }
    else {
      if((to.path !== '/' && to.path !== '/register') && state.conectado == false){
        let timerInterval
          Swal.fire({
          title: 'Debes conectarte primero!',
          html: 'Seras redireccionado en <b></b> segundos.',
          timer: 3500,
          timerProgressBar: true,
          didOpen: () => {
              Swal.showLoading()
              const b = Swal.getHtmlContainer().querySelector('b')
              timerInterval = setInterval(() => {
              b.textContent = (Swal.getTimerLeft()/1000).toFixed(0)
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
      }
      else{
        next()
      }
  }
});

  // if (to.path === '/' || to.path === '/register') {
  //   if (to.path === '/') {
  //     localStorage.getItem('connect');
  //     localStorage.setItem('connect',false);
  //     state.conectado = false;
  //   }
  //   next();
  // }
  //   else if(state.conectado == false || state.conectado == null) {
  //     let timerInterval
  //                       Swal.fire({
  //                       title: 'Debes conectarte primero!',
  //                       html: 'Seras redireccionado en <b></b> segundos.',
  //                       timer: 3500,
  //                       timerProgressBar: true,
  //                       didOpen: () => {
  //                           Swal.showLoading()
  //                           const b = Swal.getHtmlContainer().querySelector('b')
  //                           timerInterval = setInterval(() => {
  //                           b.textContent = (Swal.getTimerLeft()/1000).toFixed(0)
  //                           }, 100)
  //                       },
  //                       willClose: () => {
  //                           clearInterval(timerInterval)
  //                       }
  //                       }).then((result) => {
  //                           next('/')
  //                       /* Read more about handling dismissals below */
  //                       if (result.dismiss === Swal.DismissReason.timer) {
  //                           console.log('Fui cerrado por el timer')
  //                       }
  //                       })
  //   } else{
  //     next();
  // }
});

export default router
