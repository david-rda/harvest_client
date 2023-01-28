<template>

    <Transition name="fade" appear>

        <Teleport to="#portal" v-if="popup">

            <div class="app-popup-contaner" v-if="ready">

                <div class="app-popup">
   
                    <router-link class="app-popup-close" :to="{ query: {} }">
                        
                        <BIconXLg />
                        
                    </router-link>

                    <component v-bind:is="portal"></component>

                </div>

            </div>
                    
        </Teleport>

    </Transition>

</template>

<script>
import { mapState } from 'vuex'

import { markRaw, defineAsyncComponent } from 'vue'

export default {

    data() {

        return {

            portal: null

        }

    },

    computed: {

        ...mapState({

            ready(state) {

                return state.ready && this.portal

            }

        }),

        popup() {
            
            return this.$route.query.popup
            
        }

    },

    mounted() {

        this.portal = markRaw(defineAsyncComponent(() => import('./popup/' + this.popup + '.vue')))

    }
    
}
</script>