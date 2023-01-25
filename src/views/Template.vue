<template>

    <main class="container-fluid" :data-loading="loading">

        <component v-if="content" v-bind:is="content" v-show="loading === false" ></component>

    </main>

</template>

<script>
import { markRaw, defineAsyncComponent } from 'vue'
import { mapState, mapActions } from 'vuex'

export default {

    data() {

        return {

            content: null

        }

    },

    computed: {

        ...mapState({

            loading: state => state.loading

        })

    },

    watch: {

        $route: {

            deep: true,
            handler(to, from) {

                if(to.params.name !== from.params.name) {

                    this.load('start')

                    this.content = markRaw(defineAsyncComponent(() => import('../views/pages/' + to.params.name.toString().replaceAll('.','/') + '.vue')))

                }

            }

        }

    },

    methods: {

        ...mapActions([ 'setToken', 'load' ])

    },

    mounted() {

        this.content = markRaw(defineAsyncComponent(() => import('../views/pages/' + this.$route.params.name.toString().replaceAll('.','/') + '.vue')))

    }

}
</script>