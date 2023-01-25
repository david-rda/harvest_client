<template>

    <Transition name="fade" appear>

        <nav class="side-nav">

            <router-link to="/dashboard" class="side-logo">

                <img src="../../assets/images/logo.png">

            </router-link>

            <ul class="p-4">

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
                    <router-link :to="'/logout'" class="text-danger" @click="signout">ანგარიშიდან გასვლა</router-link>
                </li>

            </ul>

        </nav>

    </Transition>

</template>

<script>
export default {

    methods: {

        signout() {

            localStorage.removeItem("user")

            this.$router.go({ path: '/signin' })

        }

    }
    
}
</script>