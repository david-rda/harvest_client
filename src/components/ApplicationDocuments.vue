<template>

    <div>
        
        <Header />
        
        <div class="container mt-5 bg-white p-4">



        </div>

        <Footer />

    </div>

</template>

<script>
import axios from "axios"

import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {

    data() {

        return {}

    },

    methods: {

        upload() {

            axios("/application/upload/document", {}).then(response => {

                console.log(response.data)

            }).catch(error => {

                console.log(error)

            })

        }

    },

    components: { Header, Footer }

}
</script>
