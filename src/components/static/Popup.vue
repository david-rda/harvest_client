<template>

    <Transition name="fade" appear>

        <Teleport to="#portal" v-if="popup">

            <div class="app-popup-contaner">

                <div class="app-popup">
   
                    <router-link class="app-popup-close" :to="{ query: {} }">
                        
                        <BIconXLg />
                        
                    </router-link>

                    <div class="loading" v-if="loading"></div>

                    <component v-bind:is="portal"></component>

                </div>

            </div>
                    
        </Teleport>

    </Transition>

</template>

<script>
import { mapState, mapActions } from 'vuex'

import { defineAsyncComponent } from 'vue'

export default {

    methods: {

        ...mapActions([ 'load' ])

    },

    computed: {

        ...mapState({

            loading: state => state.loading
            
        }),

        popup() {
            
            return this.$route.query.popup
            
        },

        portal() {
            
            return defineAsyncComponent(() => import('./popup/' + this.$route.query.popup+ '.vue'))
        
        }

    },

    mounted() {

        this.load('start')

    }

}
</script>