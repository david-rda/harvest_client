<template>

    <Transition name="fade" appear>

        <header class="position-relative d-flex flex-column">

            <h3>სოფლის განვითარების სააგენტო</h3>
            
            <div class="loading" v-if="loading"></div>

        </header>

    </Transition>

</template>

<script>
import { mapState } from 'vuex'

export default {

    computed: {

        ...mapState({

            loading: state => state.loading

        })

    },

}
</script>