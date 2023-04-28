<template>
  <NavBar/>
  <router-view/>
</template>

<script>
import {mapState} from "vuex";
import NavBar from "./components/NavBar.vue"

export default{
  components:{
    NavBar
  },
  computed: {
    ...mapState(["conectado"])
  }
}
</script>

<style>
:root {
  --verde: #42b983;
  --gris-oscuro: #353b41;
  --gris: #2b3035;
}

.btn-primary {
    margin: 1em;
    background-color: var(--gris-oscuro)!important;
    border: 1px solid var(--gris-oscuro)!important;
}

.btn-primary:hover {
  background-color: var(--gris)!important;
  border: 1px solid var(--gris)!important;
  color: var(--verde)!important;
}



#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
