<template>

    <nav class="navbar navbar-expand-lg navbar-light">

        <div class="container-fluid">

            <div class="collapse navbar-collapse" id="navbarNavDropdown">

                <ul class="navbar-nav">

                    <li class="nav-item dropdown">

                        <a class="nav-link dropdown-toggle" href="#" id="profile-nav" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <span>{{ user.firstname }} {{ user.lastname }}</span>
                            <span>{{ user.role.name }}</span>
                        </a>
                        
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profile-nav">

                            <li>
                                <router-link class="dropdown-item text-right" :to="{ path: '/profile' }">ანგარიშის მართვა <BIconPersonCircle /></router-link>
                            </li>

                            <li>
                                <router-link class="dropdown-item text-right" :to="{ path: '/security' }">პაროლის შეცვლა <BIconShieldCheck /></router-link>
                            </li>

                            <li>
                                <span class="dropdown-item text-right" @click="signout">ანგარიშიდან გასვლა <BIconBoxArrowRight /></span>
                            </li>

                        </ul>

                    </li>

                </ul>

            </div>

        </div>

    </nav>

</template>

<script>
import { mapState } from 'vuex'

import axios from 'axios'

export default {

    computed: {

        ...mapState([ 'user' ])

    },

    methods: {

        signout() {

            axios.post("/logout").then(response => {

                localStorage.removeItem("user")

                this.$router.go({ path: '/signin' })

                console.log(response)

            }).catch(error => {

                localStorage.removeItem("user")

                this.$router.go({ path: '/signin' })

                console.log(error)

            })

        }

    },

}

</script>