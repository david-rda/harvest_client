<template>

    <Transition name="fade" appear>

        <header class="position-relative d-flex flex-column">

            <h3>სოფლის განვითარების სააგენტო</h3>

            <nav class="app-header-nav">

                <ul>

                    <li>
                        <router-link :to="'/dashboard'">ინფორმაცია</router-link>
                    </li>
                    <li>
                        <router-link :to="'/projects'">განცხადების დამატება</router-link>
                    </li>
                    <li>
                        <router-link :to="'/applications'">განაცხადები</router-link>
                    </li>
                    <li>
                        <router-link :to="'/profile'">ანგარიშის პარამეტრები</router-link>
                    </li>
                    <li>
                        <router-link :to="'/logout'" class="text-danger">ანგარიშიდან გასვლა</router-link>
                    </li>

                </ul>

            </nav>
            
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