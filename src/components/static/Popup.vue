<template>

    <Transition name="fade" appear>

        <Teleport to="#portal" v-if="popup">

            <div class="app-popup-contaner">

                <div class="app-popup">
                    
                    <component v-bind:is="portal"></component>

                </div>

            </div>
                    
        </Teleport>

    </Transition>

</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {

    computed: {

        popup() {
            
            return this.$route.query.popup
            
        },

        portal() {
            
            return defineAsyncComponent(() => import('./popup/' + this.$route.query.popup+ '.vue'))
        
        }

    }

}
</script>