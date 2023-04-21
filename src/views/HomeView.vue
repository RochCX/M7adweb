<template>
    <CursosCards/>
</template>

<script>
import store from "@/store";
import Swal from 'sweetalert2'
import router from "@/router";

const state = store.state;

    import CursosCards from '@/components/CursosCards.vue'
    export default {
        components: {
            CursosCards
        },
        created() {
            this.arranca() ? this.countdown() : null
        },
        methods:{
            arranca(){
                if (state.conectado == false) {
                    let timerInterval
                        Swal.fire({
                        title: 'Auto close alert!',
                        html: 'I will close in <b></b> milliseconds.',
                        timer: 2000,
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
                            router.push('/')
                        /* Read more about handling dismissals below */
                        if (result.dismiss === Swal.DismissReason.timer) {
                            console.log('I was closed by the timer')
                        }
                        })
            }
            }
        },
    }
</script>