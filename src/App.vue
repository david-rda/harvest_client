<template>

    <div class="app-container container-fluid" :data-user="!!user">

        <Header v-if="user" />

        <main class="container" :class="{ 'app-loading-container': !ready }">

            <router-view></router-view>
            
        </main>

        <footer v-if="ready">

            <span>Creation Of 2023 RDA Team</span>

        </footer>

        <div id="portal" v-if="this.$route.query.popup && user"></div>

    </div>

</template>

<script>
import { mapState, mapActions } from 'vuex'

import Header from './components/static/header.vue'

export default {

    name : "App",

    computed: {

        ...mapState({

            user: state => state.user,

            ready: state => state.ready

        })

    },

    components: { Header },

    methods: {

        ...mapActions([ 'load' ])

    },

    mounted() {

        this.load('start')

        console.log('%cCreation Of 2023 RDA Team', 'color: #198754; padding: 20px;')

    }

}
</script>

<style lang="scss">
    @import url("./assets/scss/fonts.scss"); // ფონტების დაიმპორტება გლობალურად
</style>