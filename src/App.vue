<template>

    <div class="app-container container-fluid">

        <div class="container d-flex">

            <Side v-if="user" />

            <div class="d-flex flex-column w-100">
        
                <Header v-if="user" />
        
                <div class="container">
                    <router-view></router-view>
                </div>

            </div>

        </div>

        <Footer />
        
        <div id="portal" v-if="this.$route.query.popup && user"></div>

    </div>

</template>

<script>
import Header from '@/components/static/Header.vue'
import Side from '@/components/static/Side.vue'
import Footer from '@/components/static/Footer.vue'

export default {

    name : "App",

    data() {

        return {

            user: null

        }

    },

    components: { Header, Side, Footer },

    mounted() {

        this.user = window.localStorage.getItem("user") || null

    }

}
</script>

<style lang="scss">
    @import url("./assets/scss/style.scss"); // მთავარი scss ფაილი
    @import url("./assets/scss/fonts.scss"); // ფონტების დაიმპორტება გლობალურად
</style>