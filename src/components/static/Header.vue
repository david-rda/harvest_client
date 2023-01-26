<template>

    <Transition name="fade" appear>

        <header>

            <div class="container">

                <div class="d-flex align-items-center text-start">

                    <div class="app-logo">
                            
                        <router-link to="/dashboard">

                            <img src="../../assets/images/logo.png">

                            <span>სოფლის განვითარების სააგენტო</span>

                        </router-link>

                    </div>

                    <nav class="app-header-nav">

                        <ul class="nav nav-pills">

                            <li class="nav-item">
                                <a class="nav-link nav-link-lined" href="/">მთავარი</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link nav-link-lined" href="/projects">განცხადების დამატება</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link nav-link-lined" href="/applications">განაცხადები</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link nav-link-lined" href="/projects">პროექტების მართვა</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link nav-link-lined" href="/users">მომხმარებლების მართვა</a>
                            </li>

                        </ul>


                    </nav>

                </div>

                <div class="text-right">

                    <nav class="navbar navbar-expand-lg navbar-light">

                        <div class="container-fluid">

                            <div class="collapse navbar-collapse" id="navbarNavDropdown">

                                <ul class="navbar-nav">

                                    <li class="nav-item dropdown">

                                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">სახელი გვარი</a>
                                        
                                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                                            <li>
                                                <router-link class="dropdown-item text-right" :to="{ path: '/profile' }">ანგარიშის მართვა <BIconPersonCircle /></router-link>
                                            </li>
                                            <li>
                                                <router-link class="dropdown-item text-right" :to="{ path: '/security' }">პაროლის შეცვლა <BIconShieldCheck /></router-link>
                                            </li>
                                            <li>
                                                <router-link class="dropdown-item text-right text-danger" :to="{ path: '/signout' }">ანგარიშიდან გასვლა <BIconBoxArrowRight /></router-link>
                                            </li>

                                        </ul>

                                    </li>

                                </ul>

                            </div>

                        </div>

                    </nav>

                </div>

            </div>
                
            <div class="loading" v-if="loading"></div>

        </header>

    </Transition>

</template>

<script>
import { mapState } from 'vuex'

export default {

    methods: {

        signout() {

            localStorage.removeItem("user")

            this.$router.go({ path: '/signin' })

        }

    },

    computed: {

        ...mapState({

            loading: state => state.loading

        })

    },

}
</script>