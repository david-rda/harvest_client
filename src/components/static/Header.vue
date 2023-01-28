<template>

    <Transition name="fade" appear>

        <header>

            <div class="container">

                <div class="d-flex align-items-center text-start">

                    <div class="app-logo">
                            
                        <router-link :to="{ path: '/dashboard' }">

                            <img src="../../assets/images/logo.png">

                            <span>სოფლის განვითარების სააგენტო</span>

                        </router-link>

                    </div>

                    <Main />

                </div>

                <div class="text-end">

                    <Profile />

                </div>

            </div>
                
        </header>

    </Transition>

</template>

<script>
import Main from './nav/main.vue'
import Profile from './nav/profile.vue'

export default {

    components: { Main, Profile }

}
</script>