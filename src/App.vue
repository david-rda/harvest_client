<template>

    <div class="app-container container-fluid">

        <Header v-if="user" />

        <div class="container">

            <router-view></router-view>
            
        </div>

        <Footer />
        
        <div id="portal" v-if="this.$route.query.popup && user"></div>

    </div>

</template>

<script>
import Header from './components/static/header.vue'
import Footer from './components/static/footer.vue'

export default {

    name : "App",

    data() {

        return {

            user: null

        }

    },

    components: { Header, Footer },

    mounted() {

        this.user = window.localStorage.getItem("user") || null

        console.log('%cCreation Of 2023 RDA Team', 'color: #198754; padding: 20px;')

    }

}
</script>

<style lang="scss">
    @import url("./assets/scss/fonts.scss"); // ფონტების დაიმპორტება გლობალურად
</style>