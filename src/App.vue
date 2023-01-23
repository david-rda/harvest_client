<template>

    <div class="app-container container-fluid">

        <div class="container d-flex">

            <Side />

            <div class="d-flex flex-column w-100">
        
                <Header />
        
                <div class="container">
                    <router-view></router-view>
                </div>

            </div>

        </div>

        <Footer />
        
        <div id="portal"></div>

    </div>

</template>

<script>
import Header from '@/components/static/Header.vue'
import Side from '@/components/static/Side.vue'
import Footer from '@/components/static/Footer.vue'

export default {

    name : "App",

    components: { Header, Side, Footer }

}
</script>

<style lang="scss">
    @import url("./assets/scss/style.scss"); // მთავარი scss ფაილი
    @import url("./assets/scss/fonts.scss"); // ფონტების დაიმპორტება გლობალურად
</style>