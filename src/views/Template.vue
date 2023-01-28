<template>

    <component v-if="content" v-bind:is="content"></component>

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

            ready: state => state.ready

        })

    },

    watch: {

        $route: {

            deep: true,
            handler(to, from) {

                if(to.params.name !== from.params.name) {

                    this.setcontent()

                }

            }

        }

    },

    methods: {

        ...mapActions([ 'load' ]),

        setcontent() {

            this.content = markRaw(defineAsyncComponent(() => import('../views/pages/' + this.$route.params.name.toString().replaceAll('.','/') + '.vue')))

        }

    },
    
    mounted() {

        this.load('finish')

        this.setcontent()

    }

}
</script>